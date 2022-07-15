using Comments.Application.Commands;
using Comments.Domain.CommentsAggregate.Requests;
using EduLinks.Application.Commands;
using EduLinks.Application.Queries;
using EduLinks.Domain.EduLinksAggregate.Requests;
using IBigDataPortal.Domain.UserMetadata;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Contracts.ViewModels;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentsController  : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    
    public CommentsController(IMediator mediator, IUser user)
    {
        _mediator = mediator;
        _user = user;
    }
    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateComment(CreateCommentRequest body)
    {
        var commentId = await _mediator.Send(new CreateCommentCommand(_user.Id, body));
        return Ok(commentId);
    }
    
    [Authorize]
    [HttpPut]
    public async Task<ActionResult> UpdateComment(UpdateCommentRequest body)
    {
        await _mediator.Send(new UpdateCommentCommand(body));
        return Ok();
    }
    
    [Authorize]
    [HttpPut("Delete/{commentId}")]
    public async Task<ActionResult> DeleteComment(int commentId)
    {
        await _mediator.Send(new DeleteCommentCommand(commentId));
        return Ok();
    }
}