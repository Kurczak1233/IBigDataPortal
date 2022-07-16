using Articles.Contracts.Enums;
using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;

public class CreateCommentsAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
    public CreateCommentsAuthorizationRequirement(int articleId, int userId, ArticlesEnum articleType)
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

public class CreateCommentsAuthorizationRequirementHandler : AuthorizationHandler<CreateCommentsAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    private readonly GetArticlesPermissions _articlesPermissions;
    public CreateCommentsAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils, GetArticlesPermissions articlesPermissions)
    {
        _usersRolesUtils = usersRolesUtils;
        _articlesPermissions = articlesPermissions;
    }
    
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, CreateCommentsAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        var articlesPermissions = await _articlesPermissions.HandleGetArticlesPermissions(requirement.ArticleType, requirement.ArticleId);
        
         //User nie może edytować przecież wszystkich nie?
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