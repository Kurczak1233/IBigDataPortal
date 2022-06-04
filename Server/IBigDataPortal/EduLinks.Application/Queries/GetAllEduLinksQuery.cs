using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using JobOffers.Domain.PostsAggregate.ViewModels;
using MediatR;

namespace EduLinks.Application.Queries;

public class GetAllEduLinksQuery : IRequest<IEnumerable<EduLinkViewModel>>
{
}

public class GetAllEduLinksQueryHandler : IRequestHandler<GetAllEduLinksQuery, IEnumerable<EduLinkViewModel>>
{
    private readonly ISqlConnectionService _connectionService;

    public GetAllEduLinksQueryHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<IEnumerable<EduLinkViewModel>> Handle(GetAllEduLinksQuery request,
        CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql = $@"SELECT {Dbo.EduLinks}.{nameof(EduLink.Title)},
                     {Dbo.EduLinks}.{nameof(EduLink.Description)},
                     {Dbo.EduLinks}.{nameof(EduLink.Id)},
                     {Dbo.EduLinks}.{nameof(EduLink.Link)},
                     {Dbo.EduLinks}.{nameof(EduLink.Posted)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail
                     FROM {Dbo.EduLinks} JOIN {Dbo.Users}
                     ON {Dbo.EduLinks}.{nameof(EduLink.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}";
        var result = await connection.QueryAsync<EduLinkViewModel>(sql);
        return result;
    }
}
