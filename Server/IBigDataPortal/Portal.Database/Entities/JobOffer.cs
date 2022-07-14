namespace IBigDataPortal.Database.Entities;

public class JobOffer : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public User Creator { get; set; } = null!;
    public int CreatorId { get; set; }
    public DateTimeOffset Posted { get; set; }   
    public int IsDeleted { get; set; }
    public int? DeletedBy { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }
}