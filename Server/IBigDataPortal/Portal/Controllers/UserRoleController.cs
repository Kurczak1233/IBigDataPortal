using ApplicationUserDomain.Models;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Users;
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
    private readonly IAuthorizationService _authorizationService;
    private readonly IUser _user;
    public UserRoleController( IMediator mediator, IAuthorizationService authorizationService, IUser user)
    {
        _mediator = mediator;
        _authorizationService = authorizationService;
        _user = user;
    }
    
    [HttpPut]
    public async Task<ActionResult<ApplicationUserDto>> UpdateUserRole([FromBody] UpdateUserRoleRequest request)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, request, new UsersAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new UpdateUserRoleCommand(request.UserId, request.RoleId));
        return Ok(result);
    }
}