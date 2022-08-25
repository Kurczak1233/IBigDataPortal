using Dapper;
using Files.Contracts.Enums;
using Files.Contracts.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Contracts.ViewModels;
using MediatR;

namespace JobOffers.Application.Queries;

public class GetAllJobOffersQuery : IRequest<IEnumerable<JobOfferViewModel>>
{
}

public class GetAllJobOffersQueryHandler : IRequestHandler<GetAllJobOffersQuery, IEnumerable<JobOfferViewModel>>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllJobOffersQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<IEnumerable<JobOfferViewModel>> Handle(GetAllJobOffersQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.JobOffers}.{nameof(JobOffer.Title)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Description)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Id)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Posted)},
                     {Dbo.JobOffers}.{nameof(JobOffer.CommentsPermissions)},
                     {Dbo.JobOffers}.{nameof(JobOffer.ArticleVisibilityPermissions)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.Guid)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedById)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.CreatedOn)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileName)},
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.ModuleEnum)} as FileModule,
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.FileType)}
                     FROM {Dbo.JobOffers} JOIN {Dbo.Users}
                     ON {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.JobOffers}.{nameof(JobOffer.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}
                     WHERE ({Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 0 OR 
                     {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} = 1 OR
                      {Dbo.FilesMetadata}.{nameof(FileMetadata.IsDeleted)} IS NULL)
                     AND {Dbo.JobOffers}.{nameof(JobOffer.IsDeleted)} = 0";
        
        var result = await connection.QueryAsync<JobOfferViewModel, FileVm, JobOfferViewModel>(sql, (jobOffer, fileVm) =>
        {
            if (fileVm != null && fileVm.IsDeleted == false && (int)fileVm.FileModule == (int)FileModuleEnum.JobOffersFiles)
            {
                jobOffer.Files.Add(fileVm);
            }
            return jobOffer;
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
