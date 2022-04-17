using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    [HttpGet]
    public ActionResult Get()
    {
        return Ok();
    }
}