using Articles.Contracts.Enums;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;
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
    private readonly IAuthorizationService _authorizationService;

    public PostsController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetAllPosts()
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new PortalAccessAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new GetAllPostsQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePost(CreatePostRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new PortalAccessAuthorizationRequirement(_user.Id));
        var postId = await _mediator.Send(new CreatePostCommand(body, _user.Id));
        return Ok(postId);
    }

    [HttpPut]
    public async Task<ActionResult> UpdatePost(UpdatePostRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new ArticlesAuthorizationRequirement(body.PostId, _user.Id, ArticlesEnum.EduLink));
        await _mediator.Send(new UpdatePostCommand(body, _user.Id));
        return Ok();
    }

    [HttpPut("Delete/{itemId}")]
    public async Task<ActionResult> DeletePost(int itemId)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, itemId,
            new ArticlesAuthorizationRequirement(itemId, _user.Id, ArticlesEnum.EduLink));
        await _mediator.Send(new DeletePostCommand(itemId, _user.Id));
        return Ok();
    }
}