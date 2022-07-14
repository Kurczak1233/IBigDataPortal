using Comments.Domain.CommentsAggregate.Requests;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace Comments.Application.Commands;

public class UpdateCommentCommand : IRequest
{
    public int UserId { get; set; }
    public UpdateCommentRequest Body { get; set; }
    public UpdateCommentCommand(int userId, UpdateCommentRequest body)
    {
        if (userId == 0)
        {
            throw new ArgumentException("User id cannot be 0", userId.ToString());
        }

        UserId = userId;
        Body = body;
    }
}

public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public UpdateCommentCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public Task<Unit> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}