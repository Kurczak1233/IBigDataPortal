namespace IBigDataPortal.Database.Entities;

public class Post : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public User Creator { get; set; }
    public int CreatorId { get; set; }
    public DateTimeOffset Posted { get; set; }
}