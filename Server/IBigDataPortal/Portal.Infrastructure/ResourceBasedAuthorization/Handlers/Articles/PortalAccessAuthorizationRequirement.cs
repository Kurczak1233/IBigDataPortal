using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;

public class PortalAccessAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }

    public PortalAccessAuthorizationRequirement(int userId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
    }
}


public class PortalAccessAuthorizationRequirementHandler : AuthorizationHandler<PortalAccessAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    public PortalAccessAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils)
    {
        _usersRolesUtils = usersRolesUtils;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PortalAccessAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        
        if ((int)UserRoles.Employee >= userRole.Id)
        {
            context.Succeed(requirement);
        }
        else
        {
            throw new ForbiddenException();
        }
    }
}