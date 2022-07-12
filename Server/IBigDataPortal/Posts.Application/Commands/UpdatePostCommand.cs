using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;
using Posts.Domain.PostsAggregate.Requests;

namespace PostsApplication.Commands;

public class UpdatePostCommand : IRequest
{
    public UpdatePostRequest Body { get; set; }
    public int CurrentUserId { get; set; }
    public UpdatePostCommand(UpdatePostRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }
        CurrentUserId = currentUserId;
    }
}

public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand>
{
    
    private readonly ISqlConnectionService _connectionService;  
    
    public UpdatePostCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<Unit> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Posts}
            SET  {nameof(Post.Title)} = @title,
            {nameof(Post.Description)} = @description
        WHERE {nameof(Post.Id)} = @postId";
        await connection.ExecuteAsync(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                postId = request.Body.PostId
            });
        return Unit.Value;
    }
}