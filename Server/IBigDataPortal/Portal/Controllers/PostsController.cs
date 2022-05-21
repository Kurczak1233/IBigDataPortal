using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> GetCurrentApplicationUser()
    {
        return Ok();
    }
}