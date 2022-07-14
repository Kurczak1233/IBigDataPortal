using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;

public class GetUsersRoleUtils
{
    private readonly ISqlConnectionService _connectionService;  
    public GetUsersRoleUtils(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    public async Task<Database.Entities.UserRole> GetUserRole(int userId)
    {
        var connection = await _connectionService.GetAsync();

        var sql =
            $@"SELECT {Dbo.UserRole}.{nameof(Database.Entities.UserRole.Id)},
                {Dbo.UserRole}.{nameof(Database.Entities.UserRole.RoleName)}
                FROM {Dbo.UserRole}
                JOIN {Dbo.Users}
                ON {Dbo.Users}.{nameof(User.UserRoleId)} = {Dbo.UserRole}.{nameof(Database.Entities.UserRole.Id)}
                WHERE {Dbo.Users}.{nameof(User.Id)} = @userId";
        return await connection.QuerySingleOrDefaultAsync<Database.Entities.UserRole>(sql,
            new
            {
                userId,
            });
    }
}