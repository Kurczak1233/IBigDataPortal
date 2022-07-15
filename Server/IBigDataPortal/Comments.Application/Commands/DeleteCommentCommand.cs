using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class DeleteCommentCommand : IRequest
{
    public int CommentId { get; set; }
    public DeleteCommentCommand(int commentId)
    {
        if (commentId == 0)
        {
            throw new ArgumentException("Comment id cannot be 0", commentId.ToString());
        }

        CommentId = commentId;
    }
}

public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public DeleteCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Comments}
               SET  {nameof(Comment.IsDeleted)} = @deleted
               WHERE {nameof(Comment.Id)} = @commentId";
        await connection.ExecuteAsync(sql,
            new
            {
                deleted = true,
                commentId = request.CommentId
            });
        return Unit.Value;
    }
}