using Comments.Domain.CommentsAggregate.Requests;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class CreateCommentCommand : IRequest<int>
{
    public int UserId { get; set; }
    public CreateCommentRequest Body { get; set; }
    public CreateCommentCommand(int userId, CreateCommentRequest body)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
        Body = body;
    }
}

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, int>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<int> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.Comments} 
               ({nameof(Comment.Content)},
               {nameof(Comment.CreatorId)},
               {nameof(Comment.CreatedOn)},
               {nameof(Comment.ArticleId)},
               {nameof(Comment.IsDeleted)},
               {nameof(Comment.ArticleType)})
               OUTPUT INSERTED.[Id]
               VALUES (@content, @creatorId, @createdOn, @articleId, @isDeleted, @articleType)";
        
        var commentId = await connection.QuerySingleAsync<int>(sql,
            new
            {
                content = request.Body.Content,
                creatorId = request.UserId,
                createdOn = nowDate,
                articleId = request.Body.ArticleId,
                articleType = (int)request.Body.ArticleType,
                isDeleted = false,
            });
        return commentId;
    }
}