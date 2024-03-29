﻿using Dapper;
using EduLinks.Domain.EduLinksAggregate.Requests;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure;
using MediatR;

namespace EduLinks.Application.Commands;

public class CreateEduLinkCommand : IRequest<int>
{
    public CreateEduLinkRequest Body { get; set; }
    public int CurrentUserId { get; set; }
    public CreateEduLinkCommand(CreateEduLinkRequest body, int currentUserId)
    {
        Body = body;
        if (currentUserId == 0)
        {
            throw new ArgumentException("User id cannot be 0!");
        }
        CurrentUserId = currentUserId;
    }
}

public class CreateJobOfferCommandHandler : IRequestHandler<CreateEduLinkCommand, int>
{
    private readonly ISqlConnectionService _connectionService;  
    
    public CreateJobOfferCommandHandler(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    public async Task<int> Handle(CreateEduLinkCommand request, CancellationToken cancellationToken)
    {
        var nowDate = DateTimeOffset.Now;
        var connection = await _connectionService.GetAsync();
        var sql =
            $@"INSERT INTO {Dbo.EduLinks}
               ({nameof(EduLink.Title)}, 
               {nameof(EduLink.Description)}, 
               {nameof(EduLink.CreatorId)}, 
               {nameof(EduLink.IsDeleted)}, 
               {nameof(EduLink.Posted)},
               {nameof(JobOffer.CommentsPermissions)},
               {nameof(JobOffer.ArticleVisibilityPermissions)})
               OUTPUT INSERTED.[Id]
               VALUES (@title, @description, @userId, @isDeleted, @dateNow, @commentsPermission, @visibilityPermission)";
        
        var eduLinkId = await connection.QuerySingleAsync<int>(sql,
            new
            {
                title = request.Body.Title,
                description = request.Body.Description,
                userId = request.CurrentUserId,
                isDeleted = 0,
                dateNow = nowDate,
                commentsPermission = request.Body.CommentsPermissions,
                visibilityPermission = request.Body.VisibilityPermissions,
            });
        return eduLinkId;
    }
}