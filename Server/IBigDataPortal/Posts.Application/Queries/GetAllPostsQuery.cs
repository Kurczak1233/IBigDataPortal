using Dapper;
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
        var sql = $@"SELECT {nameof(Post.Title)}, {nameof(Post.Description)} FROM Posts";
        var result = await connection.QueryAsync<PostViewModel>(sql);
        return result;
    }
}