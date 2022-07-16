using Dapper;
using Files.Contracts.Enums;
using Files.Contracts.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;
using Posts.Contracts.ViewModels;

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
                     {Dbo.Posts}.{nameof(Post.CommentsPermissions)},
                     {Dbo.Posts}.{nameof(Post.ArticleVisibilityPermissions)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.Guid)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedById)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedOn)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileName)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.ModuleEnum)} as FileModule,
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileType)}
                     FROM {Dbo.Posts} JOIN {Dbo.Users}
                     ON {Dbo.Posts}.{nameof(Post.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.Posts}.{nameof(Post.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}
                     WHERE ({Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 0 OR 
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 1 OR
                      {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} IS NULL)
                     AND {Dbo.Posts}.{nameof(Post.IsDeleted)} = 0";
        
        var result = await connection.QueryAsync<PostViewModel, FileVm, PostViewModel>(sql, (post, fileVm) =>
        {
            if (fileVm != null && fileVm.IsDeleted == false && (int)fileVm.FileModule == (int)FileModuleEnum.PostsFiles)
            {
                post.Files.Add(fileVm);
            }
            return post;
        },  splitOn: "Guid");

        var groupingResult = result.GroupBy(p => p.Id).Select(g =>
        {
            var groupedPost = g.First();
            var foundFiles= g.Select(p => p.Files.Count != 0 ? p.Files.Single() : null).ToList();
            var allFiles = foundFiles.FindAll(item => item != null);
            if (allFiles.Count != 0)
            {
                groupedPost.Files = allFiles;
            }
            return groupedPost;
        });

        return groupingResult;
    }
}