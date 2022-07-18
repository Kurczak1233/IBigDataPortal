using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Cooperations;

public class CooperationsAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }

    public CooperationsAuthorizationRequirement(int userId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
    }
}
public class CooperationsAuthorizationRequirementHandler : AuthorizationHandler<CooperationsAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    public CooperationsAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils)
    {
        _usersRolesUtils = usersRolesUtils;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CooperationsAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        
        if ((int)UserRoles.Admin == userRole.Id)
        {
            context.Succeed(requirement);
        }
        else
        {
            throw new ForbiddenException();
        }
    }
}