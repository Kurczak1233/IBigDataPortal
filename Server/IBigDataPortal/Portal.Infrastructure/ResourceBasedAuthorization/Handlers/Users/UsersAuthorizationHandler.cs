using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Users;

public class UsersAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }
    public UsersAuthorizationRequirement(int userId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }
        UserId = userId;
    }
}

public class UsersAuthorizationHandler : AuthorizationHandler<UsersAuthorizationRequirement>
{
    private readonly ISqlConnectionService _connectionService;
    private readonly GetUsersRoleUtils _usersRolesUtils;
    public UsersAuthorizationHandler(ISqlConnectionService connectionService, GetUsersRoleUtils usersRolesUtils)
    {
        _connectionService = connectionService;
        _usersRolesUtils = usersRolesUtils;
    }

    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, UsersAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        switch (userRole.Id)
        {
            case (int)UserRoles.Admin:
            {
                context.Succeed(requirement);
                break;
            }
            default:
            {
                throw new ForbiddenException();
            }
        }
    }
}