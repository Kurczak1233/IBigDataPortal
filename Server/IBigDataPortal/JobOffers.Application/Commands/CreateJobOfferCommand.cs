using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Domain.PostsAggregate.Requests;
using MediatR;

namespace JobOffers.Application.Commands;

public class CreateJobOfferCommand : IRequest<int>
{
    public CreateJobOfferRequest Body { get; set; }
    public int CurrentUserId { get; set; }
    public CreateJobOfferCommand(CreateJobOfferRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }
        CurrentUserId = currentUserId;
    }
}

public class CreateJobOfferCommandHandler : IRequestHandler<CreateJobOfferCommand, int>
{
    
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateJobOfferCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<int> Handle(CreateJobOfferCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.JobOffers} 
                    ({nameof(JobOffer.Title)},
                    {nameof(JobOffer.Description)},
                    {nameof(JobOffer.CreatorId)},
                    {nameof(EduLink.IsDeleted)}, 
                    {nameof(JobOffer.Posted)},
                    {nameof(JobOffer.CommentsPermissions)},
                    {nameof(JobOffer.ArticleVisibilityPermissions)})
               OUTPUT INSERTED.[Id]
               VALUES (@title, @description, @userId, @isDeleted, @dateNow, @commentsPermission, @visibilityPermission)";
        var jobOfferId = await connection.QuerySingleAsync<int>(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                userId = request.CurrentUserId,
                isDeleted = 0,
                dateNow = nowDate,
                commentsPermission = request.Body.CommentsPermissions,
                visibilityPermission = request.Body.VisibilityPermissions
            });
        return jobOfferId;
    }
}