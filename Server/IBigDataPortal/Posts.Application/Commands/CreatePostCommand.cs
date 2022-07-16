using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;
using Posts.Domain.PostsAggregate.Requests;

namespace PostsApplication.Commands;

public class CreatePostCommand : IRequest<int>
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

public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, int>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreatePostCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<int> Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.Posts} 
               ({nameof(Post.Title)},
               {nameof(Post.Description)},
               {nameof(Post.CreatorId)},
               {nameof(Post.Posted)},
               {nameof(Post.CommentsPermissions)},
               {nameof(Post.ArticleVisibilityPermissions)})
               OUTPUT INSERTED.[Id]
               VALUES (@title, @description, @userId, @dateNow, @commentsPermission, @visibilityPermission)";
        var postId = await connection.QuerySingleAsync<int>(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                userId = request.CurrentUserId,
                dateNow = nowDate,
                commentsPermission = request.Body.CommentsPermissions,
                visibilityPermission = request.Body.VisibilityPermissions
            });
        return postId;
    }
}