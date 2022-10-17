using ApplicationUserDomain.Models;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Users;
[Collection("Sequential")]
public class GetCurrentApplicationUser: IntegrationTest
{
    private readonly string Controller = "Users"; 

    public GetCurrentApplicationUser(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var response = await Client.GetAsync($"{Controller}/Current");
        response.EnsureSuccessStatusCode();
        var foundUsers = await Utilities.GetResponseContent<ApplicationUserDto>(response);
        foundUsers.Should().NotBeNull();
        foundUsers.Id.Should().Be(Utilities.AdminId);
    }
}