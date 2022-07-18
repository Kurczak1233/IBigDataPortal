using Cooperations.Domain.CooperationsAggregate.Requests;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Cooperations.Application.Commands;

public class CreateCooperationRequest : IRequest
{
    public RequestRoleForm Body { get; set; }
    public int UserId { get; set; }
    public CreateCooperationRequest(RequestRoleForm body, int userId)
    {
        Body = body;
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }
        UserId = userId;
    }
}

public class CreateCooperationRequestHandler : IRequestHandler<CreateCooperationRequest>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateCooperationRequestHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<Unit> Handle(CreateCooperationRequest request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.Cooperations} 
               ({nameof(Cooperation.RequestTopic)},
               {nameof(Cooperation.CreatorId)},
               {nameof(Cooperation.Description)},
               {nameof(Cooperation.CreatedOn)},
               {nameof(Cooperation.IsArchived)})
               VALUES (@topic, @creatorId, @description, @createdOn, @isArchived)";
        
        await connection.ExecuteAsync(sql,
            new
            {
                topic = request.Body.Topic,
                creatorId = request.UserId,
                description = request.Body.Description,
                createdOn = nowDate,
                isArchived = false,
            });
        return Unit.Value;
    }
}
