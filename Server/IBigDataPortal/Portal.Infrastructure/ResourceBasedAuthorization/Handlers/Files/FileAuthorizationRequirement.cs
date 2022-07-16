using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Files;

public class FileAuthorizationRequirement : IAuthorizationRequirement
{
    public Guid FileId { get; set; }
    public int UserId { get; set; }
    public FileAuthorizationRequirement(Guid fileId, int userId)
    {
        if (fileId == Guid.Empty)
        {
            throw new ArgumentException("File id cannot be 0", fileId.ToString());
        }

        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }
        
        FileId = fileId;
        UserId = userId;
    }
}

public class FileAuthorizationRequirementHandler : AuthorizationHandler<FileAuthorizationRequirement>
{
    private readonly GetFilesUtils _filesUtils;
    private readonly GetUsersRoleUtils _usersRolesUtils;

    public FileAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils, GetFilesUtils filesUtils)
    {
        _usersRolesUtils = usersRolesUtils;
        _filesUtils = filesUtils;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, FileAuthorizationRequirement requirement)
    {
        var createdById = await _filesUtils.GetFilePermissions(requirement.FileId);
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);

        if (userRole.Id == (int)UserRoles.Admin)
        {
            context.Succeed(requirement);
        }
        else if(userRole.Id == (int)UserRoles.Employee || userRole.Id == (int)UserRoles.HEI)
        {
            if (createdById == requirement.UserId)
            {
                context.Succeed(requirement);
            }
            else
            {
                throw new ForbiddenException();
            }
        }
        else
        {
            throw new ForbiddenException();
        }
    }
}