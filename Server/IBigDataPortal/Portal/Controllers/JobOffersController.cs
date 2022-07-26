using Articles.Contracts.Enums;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;
using JobOffers.Application.Commands;
using JobOffers.Application.Queries;
using JobOffers.Domain.PostsAggregate.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts.Contracts.ViewModels;

namespace IBigDataPortal.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class JobOffersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;
    
    public JobOffersController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostViewModel>>> GetAllJobOffers()
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new PortalAccessAuthorizationRequirement(_user.Id));
        var result = await _mediator.Send(new GetAllJobOffersQuery());
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<ActionResult> CreateJobOffer(CreateJobOfferRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new PortalAccessAuthorizationRequirement(_user.Id));
        var jobOfferId = await _mediator.Send(new CreateJobOfferCommand(body, _user.Id));
        return Ok(jobOfferId);
    }
    
    [HttpPut]
    public async Task<ActionResult> UpdateJobOffer(UpdateJobOfferRequest body)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new ArticlesAuthorizationRequirement(body.JobOfferId, _user.Id, ArticlesEnum.JobOffer));
        await _mediator.Send(new UpdateJobOfferCommand(body, _user.Id));
        return Ok();
    }
        
    [HttpPut("Delete/{itemId}")]
    public async Task<ActionResult> DeleteJobOffer(int itemId)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, itemId,
            new ArticlesAuthorizationRequirement(itemId, _user.Id, ArticlesEnum.JobOffer));
        await _mediator.Send(new DeleteJobOfferCommand(itemId, _user.Id));
        return Ok();
    }
}