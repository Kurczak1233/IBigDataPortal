using Articles.Contracts.Enums;

namespace Comments.Domain.CommentsAggregate.Requests;

public class CreateCommentRequest
{
    public string Content { get; set; }
    public int ArticleId { get; set; }
    public ArticlesEnum ArticleType { get; set; }
}