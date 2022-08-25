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

public class GetAllFilesQuery : IRequest<List<FileVm>>
{
    public int ItemId { get; set; }
    public FileModuleEnum ModuleId { get; set; }
    public GetAllFilesQuery(int itemId, FileModuleEnum moduleId)
    {
        ItemId = itemId;
        ModuleId = moduleId;
    }
}

public class GetAllFilesQueryHandler : IRequestHandler<GetAllFilesQuery, List<FileVm>>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllFilesQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;

    }
    
    public async Task<List<FileVm>> Handle(GetAllFilesQuery request, CancellationToken cancellationToken)
    {
        var files = await GetFilesMetadata(request);
        if (files.Count > 0)
        {
            foreach (var fileVm in files)
            {
                fileVm.Base64FileString = await GetFileFromGCP(fileVm.Guid.ToString(), cancellationToken);
            }

            return files;
        }
        return new List<FileVm>();
    }

    private async Task<List<FileVm>> GetFilesMetadata(GetAllFilesQuery request)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {nameof(FileMetadata.Guid)},
                        {nameof(FileMetadata.CreatedById)},
                        {nameof(FileMetadata.CreatedOn)},
                        {nameof(FileMetadata.FileType)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileName)}
                        FROM {Dbo.FilesMetadata}
                        WHERE {nameof(FileMetadata.RefId)} = @refId 
                        AND {nameof(FileMetadata.ModuleEnum)} = @moduleEnum     
                        AND {nameof(FileMetadata.IsDeleted)} = 0
                        ORDER BY {nameof(FileMetadata.CreatedOn)} DESC ";
        
        
        var result = await connection.QueryAsync<FileVm>(sql,
            new
            {
                moduleEnum = request.ModuleId,
                refId = request.ItemId
            });
        return result.ToList();
    }
    
    private async Task<string> GetFileFromGCP(string fileName, CancellationToken cancellationToken) {
        var gcsStorage = await StorageClient.CreateAsync();
        var memoryStream = new MemoryStream();
        await gcsStorage.DownloadObjectAsync(IBucketName.BucketName, fileName, memoryStream, cancellationToken: cancellationToken);
        var fileInBytes = memoryStream.ToArray();
        return Convert.ToBase64String(fileInBytes);
    }
}