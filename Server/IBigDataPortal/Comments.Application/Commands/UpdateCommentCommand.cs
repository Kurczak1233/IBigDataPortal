using Comments.Domain.CommentsAggregate.Requests;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class UpdateCommentCommand : IRequest
{
    public UpdateCommentRequest Body { get; set; }
    public UpdateCommentCommand(UpdateCommentRequest body)
    {
        Body = body;
    }
}

public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public UpdateCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Comments}
               SET  {nameof(Comment.Content)} = @content
               WHERE {nameof(Comment.Id)} = @commentId";
        await connection.ExecuteAsync(sql,
            new
            {
                content = request.Body.Content,
                commentId = request.Body.CommentId,
            });
        return Unit.Value;
    }
}