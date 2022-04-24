using IBigDataPortal.Domain.UserMetadata;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly IUser _user;

    public UsersController(IUser user)
    {
        _user = user;
    }
    
    [HttpGet]
    public ActionResult Get()
    {
        return Ok(_user.Id);
    }
}