namespace IBigDataPortal.Domain.UsersAggregate;

public interface IUsersServiceQueries
{
    Task<ApplicationUser> GetApplicationUserByEmail(string userEmail);
}