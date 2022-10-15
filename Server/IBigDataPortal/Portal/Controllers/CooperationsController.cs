using Cooperations.Application.Commands;
using Cooperations.Application.Queries;
using Cooperations.Domain.CooperationsAggregate.Requests;
using Cooperations.Domain.CooperationsAggregate.ViewModels;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Cooperations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CooperationsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;

    public CooperationsController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CooperationVm>>> GetAllCooperations()
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new CooperationsAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new
            GetAllCooperationsQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateCooperation(RequestRoleForm body)
    {
        await _mediator.Send(new CreateCooperationRequest(body, _user.Id));
        return Ok();
    }

    [HttpPut("{cooperationId}")]
    public async Task<ActionResult> ArchiveCooperation(int cooperationId)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new CooperationsAuthorizationRequirement(_user.Id));
        await _mediator.Send(new
            ArchiveCooperationRequest(cooperationId));
        return Ok();
    }
}