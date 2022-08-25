using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Comments;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Cooperations;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Files;
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
        services.AddTransient<GetArticlesPermissions>();
        services.AddTransient<GetFilesUtils>();
        services.AddSingleton<IAuthorizationHandler, UsersAuthorizationHandler>();
        services.AddSingleton<IAuthorizationHandler, CreateCommentsAuthorizationRequirementHandler>();
        services.AddSingleton<IAuthorizationHandler, ArticlesAuthorizationRequirementHandler>();
        services.AddSingleton<IAuthorizationHandler, PortalAccessAuthorizationRequirementHandler>();
        services.AddSingleton<IAuthorizationHandler, FileAuthorizationRequirementHandler>();
        services.AddSingleton<IAuthorizationHandler, EditCommentsAuthorizationRequirementHandler>();
        services.AddSingleton<IAuthorizationHandler, CooperationsAuthorizationRequirementHandler>();
    }
}