using Dapper;
using Files.Contracts.ViewModels;
using Files.Infrastructure;
using Google.Cloud.Storage.V1;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Files.Application.Queries;

public class GetFileByGuidQuery : IRequest<FileVm>
{
    public Guid Guid { get; set; }

    public GetFileByGuidQuery(Guid guid)
    {
        Guid = guid;
    }
}

public class GetFileByGuidQueryHandler : IRequestHandler<GetFileByGuidQuery, FileVm?>
{
    private readonly ISqlConnectionService _connectionService;

    public GetFileByGuidQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<FileVm?> Handle(GetFileByGuidQuery request, CancellationToken cancellationToken)
    {
        var downloadedFile = await GetFileMetadata(request);
        downloadedFile.Base64FileString = await GetFileFromGCP(downloadedFile.Guid.ToString(), cancellationToken);
        return downloadedFile;
    }

    private async Task<FileVm> GetFileMetadata(GetFileByGuidQuery request)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {nameof(FileMetadata.Guid)}, 
                        {nameof(FileMetadata.CreatedById)},
                        {nameof(FileMetadata.CreatedOn)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileType)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileName)}
                        FROM {Dbo.FilesMetadata}
                        WHERE {nameof(FileMetadata.Guid)} = @guid";

        var result = await connection.QuerySingleOrDefaultAsync<FileVm>(sql,
            new
            {
                guid = request.Guid,
            });
        return result;
    }

    private async Task<string> GetFileFromGCP(string fileName, CancellationToken cancellationToken)
    {
        var gcsStorage = await StorageClient.CreateAsync();
        var memoryStream = new MemoryStream();
        await gcsStorage.DownloadObjectAsync(IBucketName.BucketName, fileName, memoryStream,
            cancellationToken: cancellationToken);
        var fileInBytes = memoryStream.ToArray();
        return Convert.ToBase64String(fileInBytes);
    }
}