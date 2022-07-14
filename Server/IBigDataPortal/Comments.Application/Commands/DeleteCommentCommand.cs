using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class DeleteCommentCommand : IRequest
{
    public int UserId { get; set; }
    public DeleteCommentCommand(int userId)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
    }
}

public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public DeleteCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}