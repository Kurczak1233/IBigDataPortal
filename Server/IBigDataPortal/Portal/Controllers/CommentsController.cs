using Comments.Application.Commands;
using Comments.Domain.CommentsAggregate.Requests;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CommentsController  : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;
    
    public CommentsController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateComment(CreateCommentRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body, new CommentsAuthorizationRequirement(body.ArticleId, _user.Id, body.ArticleType));
        var commentId = await _mediator.Send(new CreateCommentCommand(_user.Id, body));
        return Ok(commentId);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateComment(UpdateCommentRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body, new CommentsAuthorizationRequirement(body.ArticleId, _user.Id, body.ArticleType));
        await _mediator.Send(new UpdateCommentCommand(body));
        return Ok();
    }
    
    [HttpPut("Delete")]
    public async Task<ActionResult> DeleteComment(DeleteCommentRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body, new CommentsAuthorizationRequirement(body.ArticleId, _user.Id, body.ArticleType));
        await _mediator.Send(new DeleteCommentCommand(body.CommentId));
        return Ok();
    }
}