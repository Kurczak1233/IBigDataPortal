using Dapper;
using Files.Domain.FilesAggregate.Enums;
using Files.Domain.FilesAggregate.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Domain.PostsAggregate.ViewModels;
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
                     {Dbo.JobOffers}.{nameof(JobOffer.Link)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {nameof(FileMetadata.Guid)},
                     {nameof(FileMetadata.CreatedById)},
                     {nameof(FileMetadata.CreatedOn)},
                     {nameof(FileMetadata.IsDeleted)},
                     {nameof(FileMetadata.FileName)},
                     {nameof(FileMetadata.FileType)}
                     FROM {Dbo.JobOffers} JOIN {Dbo.Users}
                     ON {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.FilesMetadata} ON {Dbo.JobOffers}.{nameof(JobOffer.Id)} = {Dbo.FilesMetadata}.{nameof(FileMetadata.RefId)}
                     WHERE ({nameof(FileMetadata.IsDeleted)} = 0 OR {nameof(FileMetadata.IsDeleted)} IS NULL)
                     AND {nameof(FileMetadata.ModuleEnum)} = {(int)FileModuleEnum.jobOffersFiles}";
        
        var result = await connection.QueryAsync<JobOfferViewModel, FileVm, JobOfferViewModel>(sql, (jobOffer, fileVm) =>
        {
            if (fileVm != null)
            {
                jobOffer.Files.Add(fileVm);
            }
            return jobOffer;
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
