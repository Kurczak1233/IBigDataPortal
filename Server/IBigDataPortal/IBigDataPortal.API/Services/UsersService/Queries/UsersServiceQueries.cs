using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure;

namespace IBigDataPortal.Services.UsersService.Queries;

public class UsersServiceQueries : IUsersServiceQueries
{
    private readonly ISqlConnectionService _connection;
    
    public UsersServiceQueries(ISqlConnectionService connection)
    {
        _connection = connection;
    }
    
    public async Task<ApplicationUser> GetApplicationUserByEmail(string userEmail)
    {
        var connection = await _connection.GetAsync();

        var user = (await connection.QueryAsync<ApplicationUser>(GetApplicationUser(), new {email = userEmail})).SingleOrDefault();
        return user;
    }
    
    private string GetApplicationUser() => $@"SELECT [{nameof(User.Id)}],
                                 [{nameof(User.Email)}]
                                 FROM [{(Dbo.Users)}]  
                                 WHERE [{nameof(User.Email)}] = @email";
}