namespace Posts.Contracts.ViewModels;

public class PostCommentViewModel
{
    public int CommentId { get; set; }
    public string CommentatorNickname { get; set; }
    public string CommentatorEmail { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public string Content { get; set; }
    public bool IsDeleted { get; set; }
    public int CreatorId { get; set; }
    public int ArticleType { get; set; }
}