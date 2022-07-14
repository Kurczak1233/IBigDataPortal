using Dapper;
using Files.Contracts.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Users.Application.Queries;

public class GetAllPortalUsersQuery : IRequest<IEnumerable<ApplicationUser>>
{
}

public class GetAllPortalUsersQueryHandler : IRequestHandler<GetAllPortalUsersQuery, IEnumerable<ApplicationUser>>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllPortalUsersQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<IEnumerable<ApplicationUser>> Handle(GetAllPortalUsersQuery request,
        CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {nameof(User.Email)},
                        {nameof(User.Nickname)},
                        {nameof(User.UserRoleId)},
                        {nameof(User.Id)}
                        FROM {Dbo.Users}
                        WHERE {nameof(User.IsDeleted)} = 0";

        return await connection.QueryAsync<ApplicationUser>(sql);
    }
}