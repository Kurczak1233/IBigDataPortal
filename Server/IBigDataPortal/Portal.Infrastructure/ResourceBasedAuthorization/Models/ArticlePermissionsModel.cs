using UserRole.Contracts.UserRoles;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Models;

public class ArticlePermissionsModel
{
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles ArticleVisibilityPermissions { get; set; }
    public bool IsDeleted { get; set; }
    public int CreatorId { get; set; }
}