using System.Net.Http.Headers;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Domain.UsersAggregate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController: ControllerBase
{
    private readonly IUser _user;
    private readonly IMediator _mediator;
    private static readonly HttpClient client = new HttpClient();
    
    public UsersController(IUser user, IMediator mediator)
    {
        _user = user;
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<string>> GetCurrentApplicationUser()
    {

        //TODO Configure this on production.
        // client.BaseAddress = new Uri("http://localhost:7196/");
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        
        await client.GetAsync("https://localhost:7196/WeatherForecast/Hey");
            
        // var result = await _mediator.Send(new)
        return Ok("SUCCESS!");
    }
}