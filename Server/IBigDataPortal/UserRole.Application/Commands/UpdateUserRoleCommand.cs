using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace UserRole.Application.Commands;

public class UpdateUserRoleCommand : IRequest
{
    public int UserId { get; set; }
    public int RoleId { get; set; }
    public UpdateUserRoleCommand(int userId, int roleId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", UserId.ToString());
        }
        if (roleId == 0)
        {
            throw new ArgumentException("Role id cannot be 0", UserId.ToString());
        }

        RoleId = roleId;
        UserId = userId;
    }
}

public class UpdateUserRoleCommandHandler : IRequestHandler<UpdateUserRoleCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    public UpdateUserRoleCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public async Task<Unit> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.Users}
                SET {Dbo.Users}.{nameof(User.UserRoleId)} = @roleId
                WHERE {Dbo.Users}.{nameof(User.Id)} = @userId";
        await connection.ExecuteAsync(sql,
            new
            {
                userId = request.UserId,
                roleId = request.RoleId
            });
        return Unit.Value;
    }
}
