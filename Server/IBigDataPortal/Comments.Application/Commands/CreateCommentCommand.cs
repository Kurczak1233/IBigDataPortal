using Comments.Domain.CommentsAggregate.Requests;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class CreateCommentCommand : IRequest
{
    public int UserId { get; set; }
    public CreateCommentRequest Body { get; set; }
    public CreateCommentCommand(int userId, CreateCommentRequest body)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
        Body = body;
    }
}

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }
    
    public Task<Unit> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}