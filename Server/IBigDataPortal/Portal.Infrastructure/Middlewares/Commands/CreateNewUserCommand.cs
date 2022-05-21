using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using MediatR;

namespace IBigDataPortal.Infrastructure.Commands;

public class CreateNewUserCommand : IRequest
{
    public string Email { get; set; }
    public string Nickname { get; set; }

    public CreateNewUserCommand(string email, string nickname)
    {
        Email = email;
        Nickname = nickname;
    }
}

public class CreateNewUserCommandHandler : IRequestHandler<CreateNewUserCommand>
{
    private readonly ISqlConnectionService _connection;

    public CreateNewUserCommandHandler(ISqlConnectionService connection)
    {
        _connection = connection;
    }

    public async Task<Unit> Handle(CreateNewUserCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connection.GetAsync();
        await connection.ExecuteAsync(CreateNewUserCommandSql(), new {email = request.Email, nickname = request.Nickname});
        return Unit.Value;
    }
    
    private string CreateNewUserCommandSql() =>  $@"INSERT INTO {Dbo.Users}
                        ({nameof(User.Email)},
                        {nameof(User.Nickname)})
                        VALUES (@email, @nickname)";
}