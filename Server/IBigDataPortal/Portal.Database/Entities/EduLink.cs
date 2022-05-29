namespace IBigDataPortal.Database.Entities;

public class EduLink : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Link { get; set; } = null!;
    public string Description { get; set; } = null!;
    public User Creator { get; set; } = null!;
    public int CreatorId { get; set; }
    public DateTimeOffset Posted { get; set; }
}