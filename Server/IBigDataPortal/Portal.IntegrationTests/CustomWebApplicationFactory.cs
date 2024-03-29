using System.Net.Http.Headers;
using IBigDataPortal.Database;
using IBigDataPortal.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Portal.IntegrationTests.Authentication;
using Portal.IntegrationTests.ClearDatabase;
using Portal.IntegrationTests.SeedDatabase;

namespace Portal.IntegrationTests;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    #pragma warning disable CS8618
    private IConfiguration Configuration { get; set; }
    #pragma warning restore CS8618
    
    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.ConfigureAppConfiguration(config =>
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory +  "../../..")
                .AddJsonFile("testsettings.json")
                .Build();

            config.AddConfiguration(Configuration);
        });
        
        builder.ConfigureServices(services =>
        {
            //Remove already injected connection services
            services.RemoveAll(typeof(DbContextOptions<ApplicationDbContext>));
            services.RemoveAll(typeof(ISqlConnectionService));
            services.RemoveAll(typeof(SqlConnectionService));

            var connectionString = Configuration.GetValue<string>("SqlTestingConnectionString");
            
            //Add new connection services
            services.AddTransient<ISqlConnectionService, SqlConnectionService>(_ => new SqlConnectionService(connectionString));
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    connectionString));
            
            //Authenticate user
            string defaultUserId = "1";
            services.Configure<TestAuthHandlerOptions>(options => options.DefaultUserId = defaultUserId);

            services.AddAuthentication((o) =>
                {
                    o.DefaultAuthenticateScheme = "Test";
                    o.DefaultChallengeScheme = "Test";
                })
                .AddScheme<TestAuthHandlerOptions, TestAuthHandler>(TestAuthHandler.AuthenticationScheme, options => { });
            
            
            //Get db context
            var serviceProvider = services.BuildServiceProvider();
            var scope = serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            try
            {
                PrepareDatabase(db).Wait();
            }
            catch (Exception ex)
            {
                throw new ArgumentException("An error occurred seeding " +
                                            "the database with test messages. Error: {Message}", ex.Message);
            }
        });
        return base.CreateHost(builder);
    }

    private static async Task PrepareDatabase(ApplicationDbContext db)
    {
        await ClearDatabaseUtilities.ClearDatabase(db);
        await db.Database.EnsureCreatedAsync();
        await Utilities.InitializeDbForTests(db);
    }
}