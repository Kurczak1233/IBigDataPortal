using Dapper;
using Files.Domain.FilesAggregate.ViewModels;
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
                     {Dbo.Posts}.{nameof(Post.Id)},
                     {Dbo.Posts}.{nameof(Post.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {nameof(FileMetadata.Guid)},
                     {nameof(FileMetadata.CreatedById)},
                     {nameof(FileMetadata.CreatedOn)},
                     {nameof(FileMetadata.IsDeleted)},
                     {nameof(FileMetadata.FileName)},
                     {nameof(FileMetadata.FileType)}
                     FROM {Dbo.Posts} JOIN {Dbo.Users}
                     ON {Dbo.Posts}.{nameof(Post.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.Posts}.{nameof(Post.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}";
        
        var result = await connection.QueryAsync<PostViewModel, FileVm, PostViewModel>(sql, (post, fileVm) =>
        {
            if (fileVm != null)
            {
                post.Files.Add(fileVm);
            }
            return post;
        },  splitOn: "Guid");

        var groupingResult = result.GroupBy(p => p.Id).Select(g =>
        {
            var groupedPost = g.First();
            var foundFiles= g.Select(p => p.Files.Count != 0 ? p.Files.Single() : null).ToList();
            if (foundFiles[0] != null)
            {
                groupedPost.Files = foundFiles;
            }
            return groupedPost;
        });

        return groupingResult;
    }
}