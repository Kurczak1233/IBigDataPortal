using ApplicationUser.Queries;
using ApplicationUserDomain.Models;
using IBigDataPortal.Domain.UserMetadata;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly IUser _user;
    private readonly IMediator _mediator;
    
    public UsersController(IUser user, IMediator mediator)
    {
        _user = user;
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<ApplicationUserDto>> GetCurrentApplicationUser()
    {
        var result = await _mediator.Send(new GetApplicationUserQuery(_user.Id));
        return Ok(result);
    }
}