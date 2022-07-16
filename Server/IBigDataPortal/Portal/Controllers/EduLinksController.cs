using Articles.Contracts.Enums;
using EduLinks.Application.Commands;
using EduLinks.Application.Queries;
using EduLinks.Domain.EduLinksAggregate.Requests;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Contracts.ViewModels;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class EduLinksController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;

    public EduLinksController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetAllEduLinks()
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new PortalAccessAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new
            GetAllEduLinksQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateEduLink(CreateEduLinkRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new PortalAccessAuthorizationRequirement(_user.Id));
        var eduLinkId = await _mediator.Send(new CreateEduLinkCommand(body, _user.Id));
        return Ok(eduLinkId);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateEduLink(UpdateEduLinkRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new ArticlesAuthorizationRequirement(body.EduLinkId, _user.Id, ArticlesEnum.EduLink));
        await _mediator.Send(new UpdateEduLinkCommand(body, _user.Id));
        return Ok();
    }

    [HttpPut("Delete/{itemId}")]
    public async Task<ActionResult> DeleteEduLink(int itemId)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, itemId,
            new ArticlesAuthorizationRequirement(itemId, _user.Id, ArticlesEnum.EduLink));
        await _mediator.Send(new DeleteEduLinkCommand(itemId, _user.Id));
        return Ok();
    }
}