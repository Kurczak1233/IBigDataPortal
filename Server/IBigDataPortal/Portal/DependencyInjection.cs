using IBigDataPortal.Database;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Domain.UsersAggregate;
using IBigDataPortal.Infrastructure;
using IBigDataPortal.Services.UsersService.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace IBigDataPortal;

public static class DependencyInjection
{
    public static void AddDependencies(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(opt =>
            opt.UseSqlServer(connectionString,   x => x.MigrationsAssembly("Portal.Database")));
        services.AddTransient<ISqlConnectionService, SqlConnectionService>(_ => new SqlConnectionService(connectionString));
        services.AddTransient<IUsersServiceQueries, UsersServiceQueries>();
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<IUser, User>();
    }
}