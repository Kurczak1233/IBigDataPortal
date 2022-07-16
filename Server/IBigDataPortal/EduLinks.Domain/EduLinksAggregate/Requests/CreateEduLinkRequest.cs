using UserRole.Contracts.UserRoles;

namespace EduLinks.Domain.EduLinksAggregate.Requests;

public class CreateEduLinkRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles VisibilityPermissions { get; set; }
}