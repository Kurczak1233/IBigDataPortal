using Articles.Contracts.Enums;
using IBigDataPortal.Infrastructure.ExceptionExtensions;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;

public class EditCommentsAuthorizationRequirement : IAuthorizationRequirement
{
    public int UserId { get; set; }
    public int ArticleId { get; set; }
    public int CommentId { get; set; }
    public ArticlesEnum ArticleType { get; set; }

    public EditCommentsAuthorizationRequirement(int articleId, int userId, ArticlesEnum articleType, int commentId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        if (articleId == 0)
        {
            throw new ArgumentException("Article id cannot be 0", articleId.ToString());
        }
        
        if (commentId == 0)
        {
            throw new ArgumentException("Comment id cannot be 0", commentId.ToString());
        }

        ArticleType = articleType;
        CommentId = commentId;
        ArticleId = articleId;
        UserId = userId;
    }
}

public class EditCommentsAuthorizationRequirementHandler : AuthorizationHandler<EditCommentsAuthorizationRequirement>
{
    private readonly GetUsersRoleUtils _usersRolesUtils;
    private readonly GetArticlesPermissions _articlesPermissions;

    public EditCommentsAuthorizationRequirementHandler(GetUsersRoleUtils usersRolesUtils,
        GetArticlesPermissions articlesPermissions)
    {
        _usersRolesUtils = usersRolesUtils;
        _articlesPermissions = articlesPermissions;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, EditCommentsAuthorizationRequirement requirement)
    {
        var userRole = await _usersRolesUtils.GetUserRole(requirement.UserId);
        var articlesPermissions =
            await _articlesPermissions.HandleGetArticlesPermissions(requirement.ArticleType, requirement.ArticleId);
        var commentOwnerId =
            await _articlesPermissions.HandleGetCommentOwner(requirement.CommentId);

        if (userRole.Id == (int)UserRoles.Admin)
        {
            context.Succeed(requirement);
        }
        else if (userRole.Id == (int)UserRoles.Employee || userRole.Id == (int)UserRoles.HEI)
        {
            if (requirement.UserId == articlesPermissions.CreatorId)
            {
                context.Succeed(requirement);
            }
            else if (requirement.UserId == commentOwnerId)
            {
                context.Succeed(requirement);
            }
            else
            {
                throw new ForbiddenException();
            }
        }
        else if (userRole.Id == (int)UserRoles.StudentOrBusiness)
        {
            if (requirement.UserId == commentOwnerId)
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