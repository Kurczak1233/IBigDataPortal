using ApplicationUser.Queries;
using ApplicationUserDomain.Models;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Users.Application.Commands;
using Users.Application.Queries;
using Users.Domain.UsersAggregate.Requests;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;
    private readonly IMediator _mediator;
    
    public UsersController(IUser user, IMediator mediator, IAuthorizationService authorizationService)
    {
        _user = user;
        _mediator = mediator;
        _authorizationService = authorizationService;
    }
    
    [HttpGet("Initial")]
    public Task<ActionResult<ApplicationUserDto>> RunMiddlewares()
    {
        return Task.FromResult<ActionResult<ApplicationUserDto>>(Ok());
    }
    
    [HttpGet("Current")]
    public async Task<ActionResult<ApplicationUserDto>> GetCurrentApplicationUser()
    {
        var result = await _mediator.Send(new GetApplicationUserQuery(_user.Id));
        return Ok(result);
    }
    
    [HttpGet("All")]
    public async Task<ActionResult<IEnumerable<ApplicationUserDto>>> GetAllPortalUsers()
    {
        var result = await _mediator.Send(new GetAllPortalUsersQuery());
        return Ok(result);
    }
    
    [HttpPut]
    public async Task<ActionResult<ApplicationUserDto>> UpdateUserNickname([FromBody] UpdateNicknameRequest request)
    {
        var result = await _mediator.Send(new UpdateUserNicknameCommand(request, _user.Id));
        return Ok(result);
    }
    
    [HttpPut("Delete/{userId}")]
    public async Task<ActionResult<ApplicationUserDto>> DeleteUser(int userId)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, userId, new UsersAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new DeleteUserCommand(userId));
        return Ok(result);
    }
}