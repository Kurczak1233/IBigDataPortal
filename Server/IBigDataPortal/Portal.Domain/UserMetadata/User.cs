using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace IBigDataPortal.Domain.UserMetadata;

public class User : IUser
{
    private readonly IHttpContextAccessor _accessor;

    public User(IHttpContextAccessor accessor)
    {
        _accessor = accessor;
    }
        
    public int Id
    {
        get
        {
            var userMetaDataClaim =
                _accessor.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == IUserMetadata.UserId);
            int.TryParse(userMetaDataClaim?.Value, out var personId);
            return personId;
        }
    }
        
    public string Email
    {
        get
        {
            var userEmail =
                _accessor.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == IUserMetadata.Email);
               
            return userEmail?.Value!;
        }
    }

    public string Nickname
    {
        get
        {
            var userLastName =
                _accessor.HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == IUserMetadata.Username);

            return userLastName?.Value!;
        }
    }

    public ClaimsPrincipal UserClaims { get; }
}