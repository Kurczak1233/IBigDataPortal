using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UsersAggregate;

namespace IBigDataPortal.Infrastructure.Middlewares.Queries;

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
        
        var user = (await connection.QueryAsync<ApplicationUser>(GetApplicationUserByEmailSql(), new {userEmail = userEmail})).SingleOrDefault();
        return user;
    }
    
    private string GetApplicationUserByEmailSql() => $@"SELECT {nameof(User.Id)},
                                 {nameof(User.Email)}
                                 FROM {(Dbo.Users)}  
                                 WHERE {nameof(User.Email)} = @userEmail";
    
}