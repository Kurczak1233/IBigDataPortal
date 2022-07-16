using Dapper;
using Files.Contracts.Enums;
using Files.Contracts.ViewModels;
using Files.Infrastructure;
using Google.Cloud.Storage.V1;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Files.Application.Queries;

public class GetFileQuery : IRequest<FileVm?>
{
    public int FileId { get; set; }
    public FileModuleEnum ModuleId { get; set; }
    public GetFileQuery(int fileId, FileModuleEnum moduleId)
    {
        FileId = fileId;
        ModuleId = moduleId;
    }
}

public class GetFileQueryHandler : IRequestHandler<GetFileQuery, FileVm?>
{
    private readonly ISqlConnectionService _connectionService;

    public GetFileQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;

    }
    
    public async Task<FileVm?> Handle(GetFileQuery request, CancellationToken cancellationToken)
    {
        if (await GetFileMetadata(request) is { } fileMetadata)
        {
            fileMetadata.Base64FileString = await GetFileFromGCP(fileMetadata.Guid.ToString(), cancellationToken);
            return fileMetadata;
        }
        return null;
    }
    
    private async Task<FileVm> GetFileMetadata(GetFileQuery request) {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT TOP 1 {nameof(FileMetadata.Guid)}, 
                        {nameof(FileMetadata.CreatedById)},
                        {nameof(FileMetadata.CreatedOn)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileType)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileName)}
                        FROM {Dbo.FilesMetadata}
                        WHERE {nameof(FileMetadata.RefId)} = @refId AND {nameof(FileMetadata.ModuleEnum)} = @moduleEnum     
                        ORDER BY {nameof(FileMetadata.CreatedOn)} DESC";
        
        var result = await connection.QuerySingleOrDefaultAsync<FileVm>(sql,
            new
            {
                moduleEnum = request.ModuleId,
                refId = request.FileId
            });
        return result;
    }
    
    private async Task<string> GetFileFromGCP(string fileName, CancellationToken cancellationToken) {
        var gcsStorage = await StorageClient.CreateAsync();
        var memoryStream = new MemoryStream();
        await gcsStorage.DownloadObjectAsync(IBucketName.BucketName, fileName, memoryStream, cancellationToken: cancellationToken);
        var fileInBytes = memoryStream.ToArray();
        return Convert.ToBase64String(fileInBytes);
    }
}