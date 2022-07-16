using UserRole.Contracts.UserRoles;

namespace EduLinks.Domain.EduLinksAggregate.Requests;

public class UpdateEduLinkRequest
{
    public int EduLinkId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles VisibilityPermissions { get; set; }
}