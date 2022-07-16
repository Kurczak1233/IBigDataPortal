using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Models;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;

public class GetFilesUtils
{
    private readonly ISqlConnectionService _connectionService;  
    public GetFilesUtils(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<int> GetFilePermissions(Guid fileId)
    {
        var connection = await _connectionService.GetAsync();
        
        var sql =
            $@"SELECT {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedBy)}
                FROM {Dbo.FilesMetadata}
                WHERE {Dbo.FilesMetadata}.{nameof(FileMetadata.Guid)} = @fileId";
        return await connection.QuerySingleOrDefaultAsync<int>(sql,
            new
            {
                fileId,
            });
    }

    
}