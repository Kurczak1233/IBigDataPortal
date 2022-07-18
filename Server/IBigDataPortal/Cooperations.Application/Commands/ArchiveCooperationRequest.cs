using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Cooperations.Application.Commands;

public class ArchiveCooperationRequest : IRequest
{
    public int CooperationId { get; set; }
    public ArchiveCooperationRequest(int cooperationId)
    {
        if (cooperationId == 0)
        {
            throw new ArgumentException("Cooperation id cannot be 0", cooperationId.ToString());
        }
        CooperationId = cooperationId;
    }
}


public class ArchiveCooperationRequestHandler : IRequestHandler<ArchiveCooperationRequest>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public ArchiveCooperationRequestHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(ArchiveCooperationRequest request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Cooperations} 
               SET {nameof(Cooperation.IsArchived)} = 1
               WHERE {nameof(Cooperation.Id)} = @cooperationId";
        
        await connection.ExecuteAsync(sql,
            new
            {
                cooperationId = request.CooperationId
            });
        return Unit.Value;
    }
}
