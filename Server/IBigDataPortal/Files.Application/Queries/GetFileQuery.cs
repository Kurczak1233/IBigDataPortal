using IBigDataPortal.Infrastructure;
using MediatR;

namespace Files.Application.Queries;

public class GetFileQuery : IRequest<string>
{
    
}

public class GetFileQueryHandler : IRequestHandler<GetFileQuery, string>
{
    private readonly ISqlConnectionService _connectionService;

    public GetFileQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;

    }
    
    public Task<string> Handle(GetFileQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}