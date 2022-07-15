using UserRole.Contracts.UserRoles;

namespace JobOffers.Domain.PostsAggregate.Requests;

public class UpdateJobOfferRequest
{
    public int JobOfferId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public UserRoles CommentsPermissions { get; set; }
    public UserRoles VisibilityPermissions { get; set; }
}