using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.PostsAggregate.Requests;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace PostsApplication.Commands;

public class CreatePostCommand : IRequest
{
    public CreatePostRequest Body { get; set; }
    public int CurrentUserId { get; set; }
    public CreatePostCommand(CreatePostRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }
        CurrentUserId = currentUserId;
    }
}

public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreatePostCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.Posts} ({nameof(Post.Title)}, {nameof(Post.Description)}, {nameof(Post.CreatorId)}, {nameof(Post.Posted)})
        VALUES (@title, @description, @userId, @dateNow)";
        await connection.ExecuteAsync(sql,
            new
            {
                title = request.Body.Title, description = request.Body.Description, userId = request.CurrentUserId,
                dateNow = nowDate
            });
        return Unit.Value;
    }
}