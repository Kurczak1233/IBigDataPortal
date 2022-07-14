using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Users.Application.Commands;

public class DeleteUserCommand : IRequest
{
    public int UserId { get; set; }
    public DeleteUserCommand(int userId)
    {
        if (userId == 0)
        {
            throw new AggregateException("Cannot delete user that id is 0");
        }
        UserId = userId;
    }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    public DeleteUserCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Users}
                SET {Dbo.Users}.{nameof(User.IsDeleted)} = @isDeleted
                WHERE {Dbo.Users}.{nameof(User.Id)} = @userId";
        await connection.ExecuteAsync(sql,
            new
            {
                userId = request.UserId,
                isDeleted = true,
            });
        return Unit.Value;
    }
}