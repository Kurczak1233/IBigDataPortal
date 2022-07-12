using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace PostsApplication.Commands;

public class DeletePostCommand : IRequest
{
    public int PostId { get; set; }
    public int UserId { get; set; }

    public DeletePostCommand(int postId, int userId)
    {
        if (postId == 0)
        {
            throw new ArgumentException("Post id should not be null", postId.ToString());
        }

        if (userId == 0)
        {
            throw new ArgumentException("User id should not be null", postId.ToString());
        }

        PostId = postId;
        UserId = userId;
    }
}

public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
{
    private readonly ISqlConnectionService _connectionService;

    public DeletePostCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Posts}
               SET {Dbo.Posts}.{nameof(Post.IsDeleted)} = 1,
               {Dbo.Posts}.{nameof(Post.DeletedBy)} = @userId,
               {Dbo.Posts}.{nameof(Post.DeletedOn)} = @dateNow
               WHERE {Dbo.Posts}.{nameof(Post.Id)} = @postId";
        await connection.ExecuteAsync(sql,
            new
            {
                userId = request.UserId,
                postId = request.PostId,
                dateNow = nowDate
            });
        return Unit.Value;
    }
}