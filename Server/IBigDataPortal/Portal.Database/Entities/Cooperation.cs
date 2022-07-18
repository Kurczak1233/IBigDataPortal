namespace IBigDataPortal.Database.Entities;

public class Cooperation : BaseEntity
{
    public User Creator { get; set; } = null!;
    public int CreatorId { get; set; }
    public string RequestTopic { get; set; }
    public string Description { get; set; }
    public bool IsArchived { get; set; } 
    public DateTimeOffset CreatedOn { get; set; }
}