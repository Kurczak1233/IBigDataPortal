using Dapper;
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

    public async Task<IEnumerable<JobOfferViewModel>> Handle(GetAllJobOffersQuery request,
        CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.JobOffers}.{nameof(JobOffer.Title)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Description)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Link)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail
                     FROM {Dbo.JobOffers} JOIN {Dbo.Users}
                     ON {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";
        var result = await connection.QueryAsync<JobOfferViewModel>(sql);
        return result;
    }
}
