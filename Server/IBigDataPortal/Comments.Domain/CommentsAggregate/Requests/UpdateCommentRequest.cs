using Articles.Contracts.Enums;

namespace Comments.Domain.CommentsAggregate.Requests;

public class UpdateCommentRequest
{
    public int CommentId { get; set; }
    public string Content { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
}