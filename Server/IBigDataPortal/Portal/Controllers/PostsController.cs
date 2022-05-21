using ApplicationUser.Queries;
using ApplicationUserDomain.Models;
using IBigDataPortal.Domain.PostsAggregate.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Domain.PostsAggregate.ViewModels;
using PostsApplication.Commands;
using PostsApplication.Queries;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly IMediator _mediator;
    public PostsController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpPost]
    public async Task<ActionResult> GetCurrentApplicationUser(CreatePostRequest body)
    {
        await _mediator.Send(new CreatePostCommand(body));
        return Ok();
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetCurrentApplicationUser()
    {
        var result = await _mediator.Send(new GetAllPostsQuery());
        return Ok(result);
    }
}