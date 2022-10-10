using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests;

public abstract class IntegrationTest : IClassFixture<CustomWebApplicationFactory>
{
    protected readonly CustomWebApplicationFactory Factory;
    protected readonly HttpClient Client;

    protected IntegrationTest(CustomWebApplicationFactory factory, ITestOutputHelper output)
    {
        Factory = factory;
        Client = Factory.CreateClient();
    }
}