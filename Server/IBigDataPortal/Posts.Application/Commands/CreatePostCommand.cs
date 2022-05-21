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
    public CreatePostCommand(CreatePostRequest body)
    {
        Body = body;
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
        var connection = await _connectionService.GetAsync();
        var sql = $@"INSERT INTO {Dbo.Posts} ({nameof(Post.Title)}, {nameof(Post.Description)})
        VALUES (@title, @description)";
        connection.ExecuteAsync(sql, new { title = request.Body.Title, description = request.Body.Description });
        return Unit.Value;
    }
}