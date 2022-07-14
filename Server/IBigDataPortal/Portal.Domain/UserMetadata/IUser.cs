using System.Security.Claims;

namespace IBigDataPortal.Domain.UserMetadata;

public interface IUser
{
     int Id { get; }
     string Email { get; }
     string Nickname { get; }
     ClaimsPrincipal UserClaims { get; }
}