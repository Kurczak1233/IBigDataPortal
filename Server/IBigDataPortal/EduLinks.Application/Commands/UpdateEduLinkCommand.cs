using Dapper;
using EduLinks.Domain.EduLinksAggregate.Requests;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace EduLinks.Application.Commands;

public class UpdateEduLinkCommand : IRequest
{
    public UpdateEduLinkRequest Body { get; set; }
    public int CurrentUserId { get; set; }

    public UpdateEduLinkCommand(UpdateEduLinkRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }

        CurrentUserId = currentUserId;
    }
}

public class UpdateEduLinkCommandHandler : IRequestHandler<UpdateEduLinkCommand>
{
    private readonly ISqlConnectionService _connectionService;

    public UpdateEduLinkCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<Unit> Handle(UpdateEduLinkCommand request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"UPDATE {Dbo.EduLinks}
                    SET  {nameof(EduLink.Title)} = @title,
                    {nameof(EduLink.Description)} = @description,
                    {nameof(EduLink.CommentsPermissions)} = @commentsPermission,
                    {nameof(EduLink.ArticleVisibilityPermissions)} = @visibilityPermission
                WHERE {nameof(EduLink.Id)} = @eduLinkId";
        await connection.ExecuteAsync(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                eduLinkId = request.Body.EduLinkId,
                commentsPermission = request.Body.CommentsPermissions,
                visibilityPermission = request.Body.VisibilityPermissions,
            });
        return Unit.Value;
    }
}