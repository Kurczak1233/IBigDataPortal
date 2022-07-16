using Articles.Contracts.Enums;

namespace Comments.Domain.CommentsAggregate.Requests;

public class DeleteCommentRequest
{
    public int CommentId { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
}