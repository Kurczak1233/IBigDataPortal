namespace IBigDataPortal.Database.Entities;

public class Comment : BaseEntity
{
    public string Content { get; set; } = null!;
    public bool IsDeleted { get; set; }
    public User Creator { get; set; } = null!;
    public int CreatorId { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public int ArticleType { get; set; }
    public int ArticleId { get; set; }
}