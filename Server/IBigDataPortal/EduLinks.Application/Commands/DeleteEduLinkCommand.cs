using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace EduLinks.Application.Commands;

public class DeleteEduLinkCommand : IRequest
{
    public int PostId { get; set; }
    public int UserId { get; set; }

    public DeleteEduLinkCommand(int postId, int userId)
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
public class DeleteEduLinkCommandHandler : IRequestHandler<DeleteEduLinkCommand>
{
    private readonly ISqlConnectionService _connectionService;

    public DeleteEduLinkCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeleteEduLinkCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.EduLinks}
               SET {Dbo.EduLinks}.{nameof(EduLink.IsDeleted)} = 1,
               {Dbo.EduLinks}.{nameof(EduLink.DeletedBy)} = @userId,
               {Dbo.EduLinks}.{nameof(EduLink.DeletedOn)} = @dateNow
               WHERE {Dbo.EduLinks}.{nameof(EduLink.Id)} = @postId";
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