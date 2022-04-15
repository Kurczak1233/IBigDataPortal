using IBigDataPortal.Database;
using Microsoft.EntityFrameworkCore;

namespace IBigDataPortal;

public static class DependencyInjection
{
    public static void AddDependencies(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(opt =>
            opt.UseSqlServer(connectionString,   x => x.MigrationsAssembly("IBigDataPortal.Database")));
    }
}