namespace Comments.Domain.CommentsAggregate.Requests;

public class UpdateCommentRequest
{
    public int CommentId { get; set; }
    public string Content { get; set; }
}