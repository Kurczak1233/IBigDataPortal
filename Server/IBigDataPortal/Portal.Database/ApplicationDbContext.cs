using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IBigDataPortal.Database;

public class ApplicationDbContext : DbContext
{
    public virtual DbSet<User> Users { get; set; }

    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     base.OnModelCreating(modelBuilder);
    //     modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    // }
}

// public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
// {
//     public ApplicationDbContext CreateDbContext(string[] args)
//     {
//         IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
//             .AddJsonFile(@Directory.GetCurrentDirectory() + "/../OneWeb.Api/appsettings.json").Build();
//         var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
//         var connectionString = configuration.GetConnectionString("sqlDataContext");
//         builder.UseSqlServer(connectionString);
//         return new ApplicationDbContext(builder.Options);
//     }
// }