using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Domain.PostsAggregate.Requests;
using MediatR;

namespace JobOffers.Application.Commands;

public class UpdateJobOfferCommand : IRequest
{
    public UpdateJobOfferRequest Body { get; set; }
    public int CurrentUserId { get; set; }
    public UpdateJobOfferCommand(UpdateJobOfferRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }
        CurrentUserId = currentUserId;
    }
}

public class UpdateJobOfferCommandHandler : IRequestHandler<UpdateJobOfferCommand>
{
    
    private readonly ISqlConnectionService _connectionService;  
    
    public UpdateJobOfferCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<Unit> Handle(UpdateJobOfferCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.JobOffers}
            SET  {nameof(JobOffer.Title)} = @title,
            {nameof(JobOffer.Description)} = @description,
            {nameof(JobOffer.CommentsPermissions)} = @commentsPermission,
            {nameof(JobOffer.ArticleVisibilityPermissions)} = @visibilityPermission
        WHERE {nameof(JobOffer.Id)} = @jobOfferId";
        await connection.ExecuteAsync(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                jobOfferId = request.Body.JobOfferId,
                commentsPermission = request.Body.CommentsPermissions,
                visibilityPermission = request.Body.VisibilityPermissions,
            });
        return Unit.Value;
    }
}