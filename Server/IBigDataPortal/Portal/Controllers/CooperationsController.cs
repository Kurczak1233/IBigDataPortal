using Cooperations.Application.Commands;
using Cooperations.Domain.CooperationsAggregate.Requests;
using IBigDataPortal.Domain.UserMetadata;
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

    public CooperationsController(IMediator mediator, IUser user)
    {
        _mediator = mediator;
        _user = user;
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateEduLink(RequestRoleForm body)
    {
        await _mediator.Send(new CreateCooperationRequest(body, _user.Id));
        return Ok();
    }
}