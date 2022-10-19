using MediatR;
using Microsoft.AspNetCore.Mvc;
using MobileApiOuterProject.Application;
using MobileApiOuterProject.Application.Queries;

namespace IBigDataPortal.MobileApiControllerOuterProject;

[ApiController]
[Route("[controller]")]
public class MobileApiController : ControllerBase
{
    private readonly IMediator _mediator;
    public MobileApiController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<CoordinatesVm>>> GetAllPosts()
    {
        var result = await _mediator.Send(new GetCoordinatesQuery());
        return Ok(result);
    }

}