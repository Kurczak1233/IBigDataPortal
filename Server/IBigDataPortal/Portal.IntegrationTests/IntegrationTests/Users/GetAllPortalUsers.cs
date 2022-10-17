using ApplicationUserDomain.Models;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Users;

[Collection("Sequential")]
public class GetAllPortalUsers : IntegrationTest
{
    private readonly string Controller = "Users"; 

    public GetAllPortalUsers(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var response = await Client.GetAsync($"{Controller}/All");
        response.EnsureSuccessStatusCode();
        var foundUsers = await Utilities.GetResponseContent<IEnumerable<ApplicationUserDto>>(response);
        var applicationUserDtos = foundUsers.ToList();
        applicationUserDtos.Should().NotBeEmpty();
        applicationUserDtos.Count.Should().Be(2);
    }
}