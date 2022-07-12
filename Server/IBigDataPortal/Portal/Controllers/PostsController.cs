using ApplicationUser.Queries;
using ApplicationUserDomain.Models;
using IBigDataPortal.Domain.UserMetadata;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Contracts.ViewModels;
using Posts.Domain.PostsAggregate.Requests;
using PostsApplication.Commands;
using PostsApplication.Queries;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    public PostsController(IMediator mediator, IUser user)
    {
        _mediator = mediator;
        _user = user;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetAllPosts()
    {
        var result = await _mediator.Send(new GetAllPostsQuery());
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<ActionResult> CreatePost(CreatePostRequest body)
    {
        var postId = await _mediator.Send(new CreatePostCommand(body, _user.Id));
        return Ok(postId);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdatePost(UpdatePostRequest body)
    {
        await _mediator.Send(new UpdatePostCommand(body, _user.Id));
        return Ok();
    }
    
    [HttpPut("Delete/{itemId}")]
    public async Task<ActionResult> DeletePost(int itemId)
    {
        await _mediator.Send(new DeletePostCommand(itemId, _user.Id));
        return Ok();
    }
}