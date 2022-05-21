using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> GetCurrentApplicationUser()
    {
        return Ok();
    }
}