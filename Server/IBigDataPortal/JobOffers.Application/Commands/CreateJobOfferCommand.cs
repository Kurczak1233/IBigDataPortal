using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Domain.PostsAggregate.Requests;
using MediatR;

namespace JobOffers.Application.Commands;

public class CreateJobOfferCommand : IRequest
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

public class CreateJobOfferCommandHandler : IRequestHandler<CreateJobOfferCommand>
{
    
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateJobOfferCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(CreateJobOfferCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.JobOffers} ({nameof(JobOffer.Title)}, {nameof(JobOffer.Link)}, {nameof(JobOffer.Description)}, {nameof(JobOffer.CreatorId)}, {nameof(JobOffer.Posted)})
        VALUES (@title, @link, @description, @userId, @dateNow)";
        await connection.ExecuteAsync(sql,
            new
            {
                title = request.Body.Title, link = request.Body.Link, description = request.Body.Description, userId = request.CurrentUserId,
                dateNow = nowDate
            });
        return Unit.Value;
    }
}