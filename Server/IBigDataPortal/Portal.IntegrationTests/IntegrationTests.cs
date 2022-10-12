using System.Net.Http.Headers;
using IBigDataPortal.Database;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Portal.IntegrationTests.Authentication;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests;

public abstract class IntegrationTest : IClassFixture<CustomWebApplicationFactory>
{
    protected readonly CustomWebApplicationFactory Factory;
    protected readonly HttpClient Client;
    protected readonly ApplicationDbContext Context;
    protected IntegrationTest(CustomWebApplicationFactory factory, ITestOutputHelper output)
    {
        Factory = factory;
        Client = Factory.CreateClient();
        var scope = Factory.Services.CreateScope();
        Context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Test");

    }
}