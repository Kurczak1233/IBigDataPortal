using Articles.Contracts.Enums;
using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;

public class ArticlesAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
    public ArticlesAuthorizationRequirement(int articleId, int userId, ArticlesEnum articleType)
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


public class ArticlesAuthorizationRequirementHandler : AuthorizationHandler<ArticlesAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    private readonly GetArticlesPermissions _articlesPermissions;
    public ArticlesAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils, GetArticlesPermissions articlesPermissions)
    {
        _usersRolesUtils = usersRolesUtils;
        _articlesPermissions = articlesPermissions;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, ArticlesAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        var articlesPermissions = await _articlesPermissions.HandleGetArticlesPermissions(requirement.ArticleType, requirement.ArticleId);
        
        if (userRole.Id == (int)UserRoles.Admin)
        {
            context.Succeed(requirement);
        }
        else if(userRole.Id == (int)UserRoles.Employee || userRole.Id == (int)UserRoles.HEI)
        {
            if (articlesPermissions.CreatorId == requirement.UserId)
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