using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Files.Application.Commands;

public class DeleteFileCommand : IRequest
{
    public string FileName { get; set; }
    public DeleteFileCommand(string fileName)
    {
        FileName = fileName;
    }
}

public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand>
{
    private readonly ISqlConnectionService _connectionService;
    public DeleteFileCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeleteFileCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"UPDATE {Dbo.FilesMetadata} 
                        SET {nameof(FileMetadata.IsDeleted)} = 1
                        WHERE {nameof(FileMetadata.Guid)} = @fileId";
        await connection.ExecuteAsync(sql, new { fileId = request.FileName });
        return Unit.Value;
    }
}