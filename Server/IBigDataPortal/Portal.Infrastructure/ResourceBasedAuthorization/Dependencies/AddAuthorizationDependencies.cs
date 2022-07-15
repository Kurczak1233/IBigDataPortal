using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Users;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Dependencies;

public static class AddAuthorizationDependencies
{
    public static void AddPermissionDependencies(this IServiceCollection services)
    {
        services.AddTransient<GetUsersRoleUtils>();
        services.AddSingleton<IAuthorizationHandler, UsersAuthorizationHandler>();
    }
}