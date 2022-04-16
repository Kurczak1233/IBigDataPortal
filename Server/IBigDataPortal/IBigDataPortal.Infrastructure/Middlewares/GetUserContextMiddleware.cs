using System.Security.Claims;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace IBigDataPortal.Infrastructure.Middlewares;

public class GetUserContextMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IMediator _mediator;
    private readonly string _connectionString;
    
    public GetUserContextMiddleware(RequestDelegate next, string connectionString, IMediator mediator)
    {
        _next = next;
        _connectionString = connectionString;
        _mediator = mediator;
    }

    public async Task Invoke(HttpContext context, IUsersServiceQueries usersServiceQueries)
    {
        var userEmail = context.User.Claims.FirstOrDefault(c => c.Type == IUserMetadata.Email)?.Value;

        //Cache userId for 20 seconds
        var id = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
        var memoryCache = context.RequestServices.GetRequiredService<IMemoryCache>();
        var userId = memoryCache.GetOrCreate($"USER_{id}", entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20);
            return entry.Value;
        });

        if (userId != null)
        {
            context.User.AddIdentity(new ClaimsIdentity(new List<Claim>
            {
                new(IUserMetadata.UserId, userId.ToString())
            }));
        }
        else
        {
            var user = await usersServiceQueries.GetApplicationUserByEmail(userEmail);
            if (user != null)
            {
                memoryCache.Set($"USER_{id}", user.Id);
            }
            else
            {
                var command = new CreateNewUserCommand(userEmail, "test", "test2");
                await _mediator.Send(command);
                var createdUser = await usersServiceQueries.GetApplicationUserByEmail(userEmail);
                memoryCache.Set($"USER_{id}", createdUser.Id);
            }
        }
        
        // var firstName = context.User.Claims.FirstOrDefault(c => c.Type == Metadata.FirstName)?.Value;
        // var lastName = context.User.Claims.FirstOrDefault(c => c.Type == Metadata.LastName)?.Value;

        // var newUserClass = new AddNewUserToDatabase(_connectionString);
        // var userExistsClass = new GetUserByEmail(_connectionString);
        // var id = context.User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
        // var memoryCache = context.RequestServices.GetRequiredService<IMemoryCache>();

        // if (userId != null)
        // {
        //     context.User.AddIdentity(new ClaimsIdentity(new List<Claim>
        //     {
        //         new(Metadata.UserId, userId.ToString())
        //     }));
        //
        //     await _mediator.Publish(new UserLoggedInEvent(Int32.Parse(userId.ToString())));
        // }
        // else
        // {
        //     var user = await userExistsClass.GetApplicationUserByEmail(userEmail);
        //     if (user != null)
        //     {
        //         memoryCache.Set($"USER_{id}", user.Id);
        //     }
        //     else
        //     {
        //         var newUser = await newUserClass.AddUserToDb(userEmail, firstName, lastName);
        //         var userSettingsQuery = new UserSettingsQuery(_connectionString);
        //         if (userEmail != null)
        //         {
        //             await userSettingsQuery.AddUserSettingsToDb(newUser.Id);
        //             memoryCache.Set($"USER_{id}", newUser.Id);
        //         }
        //     }
        // }
        await _next(context);
    }
}