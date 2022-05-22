using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;
using Posts.Domain.PostsAggregate.ViewModels;

namespace PostsApplication.Queries;

public class GetAllPostsQuery : IRequest<IEnumerable<PostViewModel>>
{
}

public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, IEnumerable<PostViewModel>>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public GetAllPostsQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<IEnumerable<PostViewModel>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.Posts}.{nameof(Post.Title)},
                     {Dbo.Posts}.{nameof(Post.Description)},
                     {Dbo.Posts}.{nameof(Post.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail
                     FROM {Dbo.Posts} JOIN {Dbo.Users}
                     ON {Dbo.Posts}.{nameof(Post.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";
        var result = await connection.QueryAsync<PostViewModel>(sql);
        return result;
    }
}