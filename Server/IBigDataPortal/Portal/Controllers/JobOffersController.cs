using IBigDataPortal.Domain.UserMetadata;
using JobOffers.Application.Commands;
using JobOffers.Application.Queries;
using JobOffers.Domain.PostsAggregate.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Contracts.ViewModels;
using PostsApplication.Commands;
using PostsApplication.Queries;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class JobOffersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    public JobOffersController(IMediator mediator, IUser user)
    {
        _mediator = mediator;
        _user = user;
    }
    [HttpPost]
    public async Task<ActionResult> CreateJobOffer(CreateJobOfferRequest body)
    {
        var jobOfferId = await _mediator.Send(new CreateJobOfferCommand(body, _user.Id));
        return Ok(jobOfferId);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetAllJobOffers()
    {
        var result = await _mediator.Send(new GetAllJobOffersQuery());
        return Ok(result);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateJobOffer(UpdateJobOfferRequest body)
    {
        await _mediator.Send(new UpdateJobOfferCommand(body, _user.Id));
        return Ok();
    }
}