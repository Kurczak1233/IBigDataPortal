using Cooperations.Domain.CooperationsAggregate.ViewModels;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Cooperations.Application.Queries;

public class GetAllCooperationsQuery : IRequest<IEnumerable<CooperationVm>>
{
    
}

public class GetAllCooperationsQueryHandler : IRequestHandler<GetAllCooperationsQuery, IEnumerable<CooperationVm>>
{
    private readonly ISqlConnectionService _connectionService;  

    public GetAllCooperationsQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<IEnumerable<CooperationVm>> Handle(GetAllCooperationsQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.Cooperations}.{nameof(Cooperation.Id)},
                        {nameof(Cooperation.CreatedOn)},
                        {nameof(Cooperation.Description)},
                        {nameof(Cooperation.CreatorId)},
                        {nameof(Cooperation.IsArchived)},
                        {nameof(Cooperation.RequestTopic)},
                        {nameof(User.Email)} as CreatorEmail
                        FROM {Dbo.Cooperations} JOIN {Dbo.Users}
                        ON {Dbo.Users}.{nameof(User.Id)} = {Dbo.Cooperations}.{nameof(Cooperation.CreatorId)}";

        return await connection.QueryAsync<CooperationVm>(sql);
    }
}