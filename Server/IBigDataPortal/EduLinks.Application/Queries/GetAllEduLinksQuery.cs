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
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.Guid)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedById)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedOn)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileName)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.ModuleEnum)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileType)}
                     FROM {Dbo.EduLinks} JOIN {Dbo.Users}
                     ON {Dbo.EduLinks}.{nameof(EduLink.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.EduLinks}.{nameof(EduLink.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}
                     WHERE ({Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 0 OR 
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 1 OR
                      {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} IS NULL)
                     AND {Dbo.EduLinks}.{nameof(EduLink.IsDeleted)} = 0";
        
        var result = await connection.QueryAsync<EduLinkViewModel, FileVm, EduLinkViewModel>(sql, (eduLink, fileVm) =>
        {
            if (fileVm != null && fileVm.IsDeleted == false && (int)fileVm.FileModule == (int)FileModuleEnum.EduLinksFiles)
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
