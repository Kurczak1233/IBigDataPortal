namespace IBigDataPortal.Database.Entities;

public class Post : BaseEntity
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
}