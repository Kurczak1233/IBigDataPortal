using Dapper;
using Files.Domain.FilesAggregate.Enums;
using Files.Domain.FilesAggregate.ViewModels;
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
        return await GetFilesMetadata(request);
    }

    private async Task<List<FileVm>> GetFilesMetadata(GetAllFilesQuery request)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {nameof(FileMetadata.Guid)},
                        {nameof(FileMetadata.CreatedById)},
                        {nameof(FileMetadata.CreatedOn)},
                        {nameof(FileMetadata.IsDeleted)},
                        {nameof(FileMetadata.FileName)}
                        FROM {Dbo.FilesMetadata}
                        WHERE {nameof(FileMetadata.RefId)} = @refId AND {nameof(FileMetadata.ModuleEnum)} = @moduleEnum     
                        ORDER BY {nameof(FileMetadata.CreatedOn)} DESC";
        
        
        var result = await connection.QueryAsync<FileVm>(sql,
            new
            {
                moduleEnum = request.ModuleId,
                refId = request.ItemId
            });
        return result.ToList();
    }
}