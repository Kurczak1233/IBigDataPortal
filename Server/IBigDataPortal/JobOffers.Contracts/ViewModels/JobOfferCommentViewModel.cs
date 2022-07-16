namespace JobOffers.Contracts.ViewModels;

public class JobOfferCommentViewModel
{
    public int CommentId { get; set; }
    public string CommentatorNickname { get; set; }
    public string CommentatorEmail { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public string Content { get; set; }
    public bool IsDeleted { get; set; }
    public int CreatorId { get; set; }

}