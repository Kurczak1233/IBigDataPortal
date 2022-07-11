using Articles.Domain.ArticlesAggregate.ViewModels;
using Dapper;
using EduLinks.Contracts.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Contracts.ViewModels;
using MediatR;
using Posts.Contracts.ViewModels;

namespace Articles.Application.Queries;

public class GetAllArticlesQuery : IRequest<ArticlesVm>
{
}

public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, ArticlesVm>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllArticlesQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<ArticlesVm> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var jobOffersSql = $@"SELECT {Dbo.JobOffers}.{nameof(JobOffer.Title)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Description)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Id)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Link)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'JobOffer' as Type
                     FROM {Dbo.JobOffers} JOIN {Dbo.Users}
                     ON {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";

        var eduLinksSql = $@"SELECT {Dbo.EduLinks}.{nameof(EduLink.Title)},
                     {Dbo.EduLinks}.{nameof(EduLink.Description)},
                     {Dbo.EduLinks}.{nameof(EduLink.Id)},
                     {Dbo.EduLinks}.{nameof(EduLink.Link)},
                     {Dbo.EduLinks}.{nameof(EduLink.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'EduLink' as Type
                     FROM {Dbo.EduLinks} JOIN {Dbo.Users}
                     ON {Dbo.EduLinks}.{nameof(EduLink.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";

        var postsSql = $@"SELECT {Dbo.Posts}.{nameof(Post.Title)},
                     {Dbo.Posts}.{nameof(Post.Description)},
                     {Dbo.Posts}.{nameof(Post.Id)},
                     {Dbo.Posts}.{nameof(Post.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'Post' as Type
                     FROM {Dbo.Posts} JOIN {Dbo.Users}
                     ON {Dbo.Posts}.{nameof(Post.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";

        var jobOffers = await connection.QueryAsync<JobOfferViewModel>(jobOffersSql);
        var posts = await connection.QueryAsync<PostViewModel>(postsSql);
        var eduLinks = await connection.QueryAsync<EduLinkViewModel>(eduLinksSql);

        return new ArticlesVm()
        {
            JobOffers = jobOffers,
            EduLinks = eduLinks,
            Posts = posts,
        };
    }
}