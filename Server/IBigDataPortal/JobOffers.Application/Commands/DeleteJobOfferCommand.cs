using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace JobOffers.Application.Commands;

public class DeleteJobOfferCommand : IRequest
{
    public int PostId { get; set; }
    public int UserId { get; set; }

    public DeleteJobOfferCommand(int postId, int userId)
    {
        if (postId == 0)
        {
            throw new ArgumentException("Post id should not be null", postId.ToString());
        }

        if (userId == 0)
        {
            throw new ArgumentException("User id should not be null", postId.ToString());
        }

        PostId = postId;
        UserId = userId;
    }
}

public class DeleteJobOfferCommandHandler : IRequestHandler<DeleteJobOfferCommand>
{
    private readonly ISqlConnectionService _connectionService;

    public DeleteJobOfferCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeleteJobOfferCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.JobOffers}
               SET {Dbo.JobOffers}.{nameof(JobOffer.IsDeleted)} = 1,
               {Dbo.JobOffers}.{nameof(JobOffer.DeletedBy)} = @userId,
               {Dbo.JobOffers}.{nameof(JobOffer.DeletedOn)} = @dateNow
               WHERE {Dbo.JobOffers}.{nameof(JobOffer.Id)} = @postId";
        await connection.ExecuteAsync(sql,
            new
            {
                userId = request.UserId,
                postId = request.PostId,
                dateNow = nowDate
            });
        return Unit.Value;
    }
}