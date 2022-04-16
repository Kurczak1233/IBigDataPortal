using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UsersAggregate;
using MediatR;

namespace IBigDataPortal.Infrastructure.Commands;

public class CreateNewUserCommand : IRequest
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public CreateNewUserCommand(string email, string firstName, string lastName)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
    }
}

public class CreateNewUserCommandHandler : IRequestHandler<CreateNewUserCommand>
{
    private readonly ISqlConnectionService _connection;

    public CreateNewUserCommandHandler(ISqlConnectionService connection)
    {
        _connection = connection;

    }
    private string CreateNewUserCommandSql() =>  $@"INSERT INTO [{Dbo.Users}]
                        ([{nameof(User.Email)}],
                        [{nameof(User.FirstName)}],
                        [{nameof(User.LastName)}])
                        VALUES (@email, @firstName, @lastName)";

    public async Task<Unit> Handle(CreateNewUserCommand request, CancellationToken cancellationToken)
    {
        var firstName = "test";
        var lastName = "test2";
        var connection = await _connection.GetAsync();
        await connection.ExecuteAsync(CreateNewUserCommandSql(), new {request.Email, request.FirstName, request.LastName});
        return Unit.Value;
    }
}