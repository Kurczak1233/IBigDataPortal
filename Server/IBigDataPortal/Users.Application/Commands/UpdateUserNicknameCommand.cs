using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Infrastructure;
using MediatR;
using Users.Domain.UsersAggregate.Requests;
using User = IBigDataPortal.Domain.UserMetadata.User;

namespace Users.Application.Commands;

public class UpdateUserNicknameCommand : IRequest
{
    public UpdateNicknameRequest Request { get; }
    public int UserId { get; }
    public UpdateUserNicknameCommand(UpdateNicknameRequest request, int userId)
    {
        Request = request;
        UserId = userId;
    }
}

public class UpdateUserNicknameCommandHandler : IRequestHandler<UpdateUserNicknameCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    public UpdateUserNicknameCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(UpdateUserNicknameCommand command, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Users}
                SET {Dbo.Users}.{nameof(User.Nickname)} = @nickname
                WHERE {Dbo.Users}.{nameof(User.Id)} = @userId";
        await connection.ExecuteAsync(sql,
            new
            {
                userId = command.UserId,
                nickname = command.Request.Nickname
            });
        return Unit.Value;
    }
}