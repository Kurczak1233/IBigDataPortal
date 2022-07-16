using Articles.Contracts.Enums;
using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;

public class CommentsAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
    public CommentsAuthorizationRequirement(int articleId, int userId, ArticlesEnum articleType)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        if (articleId == 0)
        {
            throw new ArgumentException("Article id cannot be 0", userId.ToString());
        }

        ArticleType = articleType;
        ArticleId = articleId;
        UserId = userId;
    }
}

public class CommentsAuthorizationRequirementHandler : AuthorizationHandler<CommentsAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    private readonly GetArticlesPermissions _articlesPermissions;
    public CommentsAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils, GetArticlesPermissions articlesPermissions)
    {
        _usersRolesUtils = usersRolesUtils;
        _articlesPermissions = articlesPermissions;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CommentsAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        var articlesPermissions = await _articlesPermissions.HandleGetArticlesPermissions(requirement.ArticleType, requirement.ArticleId);
        
        if ((int)articlesPermissions.CommentsPermissions >= userRole.Id)
        {
            context.Succeed(requirement);
        }
        else if(userRole.Id == (int)UserRoles.Admin)
        {
            context.Succeed(requirement);
        }
        else
        {
            throw new ForbiddenException();
        }
    }
}