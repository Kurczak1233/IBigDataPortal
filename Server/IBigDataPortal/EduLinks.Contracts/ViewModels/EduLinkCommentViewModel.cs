namespace EduLinks.Contracts.ViewModels;

public class EduLinkCommentViewModel
{
    public int CommentId { get; set; }
    public int CreatorId { get; set; }
    public string CommentatorNickname { get; set; }
    public string CommentatorEmail { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public string Content { get; set; }
    public bool IsDeleted { get; set; }
}