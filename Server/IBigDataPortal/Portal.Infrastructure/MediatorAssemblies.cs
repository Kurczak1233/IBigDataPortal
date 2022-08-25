using IBigDataPortal.Database;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure.Middlewares.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace IBigDataPortal.Infrastructure;

public static class MediatorAssemblies
{
    public static void AddAssemblies(this IServiceCollection services)
    {
        services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
        services.AddMediatR(AppDomain.CurrentDomain.Load("ApplicationUser"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Posts.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("JobOffers.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("EduLinks.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Files.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Users.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Articles.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("UserRole.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Comments.Application"));
        services.AddMediatR(AppDomain.CurrentDomain.Load("Cooperations.Application"));
    }
}