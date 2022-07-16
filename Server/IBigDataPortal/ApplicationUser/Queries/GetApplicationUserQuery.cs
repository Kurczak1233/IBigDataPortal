using ApplicationUserDomain.Models;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace ApplicationUser.Queries;

public class GetApplicationUserQuery : IRequest<ApplicationUserDto>
{
    public int UserId { get; set; }
    public GetApplicationUserQuery(int userId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }
        UserId = userId;
    }
}

public class GetApplicationUserQueryHandler : IRequestHandler<GetApplicationUserQuery, ApplicationUserDto>

{
    private readonly ISqlConnectionService _connectionService;
    public GetApplicationUserQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    public async Task<ApplicationUserDto> Handle(GetApplicationUserQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();

        var sql = $@"SELECT {nameof(User.Id)},
                            {nameof(User.Email)},
                            {nameof(User.Nickname)},
                            {nameof(User.UserRoleId)}
                     FROM {Dbo.Users}
                     WHERE {nameof(User.Id)} = @id";

        var foundUser = await connection.QuerySingleOrDefaultAsync<ApplicationUserDto>(sql,new { id = request.UserId});

        return foundUser;
    }
}