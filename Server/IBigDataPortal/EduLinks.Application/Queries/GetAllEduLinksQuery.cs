using Dapper;
using EduLinks.Contracts.ViewModels;
using Files.Contracts.ViewModels;
using Files.Domain.FilesAggregate.Enums;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace EduLinks.Application.Queries;

public class GetAllEduLinksQuery : IRequest<IEnumerable<EduLinkViewModel>>
{
}

public class GetAllEduLinksQueryHandler : IRequestHandler<GetAllEduLinksQuery, IEnumerable<EduLinkViewModel>>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllEduLinksQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<IEnumerable<EduLinkViewModel>> Handle(GetAllEduLinksQuery request,
        CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.EduLinks}.{nameof(EduLink.Title)},
                     {Dbo.EduLinks}.{nameof(EduLink.Description)},
                     {Dbo.EduLinks}.{nameof(EduLink.Id)},
                     {Dbo.EduLinks}.{nameof(EduLink.Link)},
                     {Dbo.EduLinks}.{nameof(EduLink.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {nameof(FileMetadata.Guid)},
                     {nameof(FileMetadata.CreatedById)},
                     {nameof(FileMetadata.CreatedOn)},
                     {nameof(FileMetadata.IsDeleted)},
                     {nameof(FileMetadata.FileName)},
                     {nameof(FileMetadata.FileType)}
                     FROM {Dbo.EduLinks} JOIN {Dbo.Users}
                     ON {Dbo.EduLinks}.{nameof(EduLink.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.EduLinks}.{nameof(EduLink.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}
                     WHERE ({nameof(FileMetadata.IsDeleted)} = 0 OR {nameof(FileMetadata.IsDeleted)} IS NULL)
                     AND ({nameof(FileMetadata.ModuleEnum)} = {(int)FileModuleEnum.eduLinksFiles} OR {nameof(FileMetadata.ModuleEnum)} IS NULL)";
        
        var result = await connection.QueryAsync<EduLinkViewModel, FileVm, EduLinkViewModel>(sql, (eduLink, fileVm) =>
        {
            if (fileVm != null)
            {
                eduLink.Files.Add(fileVm);
            }
            return eduLink;
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
