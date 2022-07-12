using Articles.Application.Queries;
using Articles.Domain.ArticlesAggregate.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly IMediator _mediator;
    public ArticlesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<ArticlesVm>> GetAllPosts()
    {
        var result = await _mediator.Send(new GetAllArticlesQuery());
        return Ok(result);
    }
}