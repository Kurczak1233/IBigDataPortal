using ApplicationUserDomain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserRole.Application.Commands;
using UserRole.Domain.UserRoleAggregate.Requests;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserRoleController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public UserRoleController( IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPut]
    public async Task<ActionResult<ApplicationUserDto>> UpdateUserRole([FromBody] UpdateUserRoleRequest request)
    {
        var result = await _mediator.Send(new UpdateUserRoleCommand(request.UserId, request.RoleId));
        return Ok(result);
    }
}