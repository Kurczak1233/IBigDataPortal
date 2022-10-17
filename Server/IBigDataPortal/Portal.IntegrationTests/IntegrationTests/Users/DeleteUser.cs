using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Users;
[Collection("Sequential")]
public class DeleteUser: IntegrationTest
{
    private readonly string Controller = "Users"; 

    public DeleteUser(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var response = await Client.PutAsync($"{Controller}/Delete/{Utilities.UserId}", Utilities.GetRequestContent(null!));
        response.EnsureSuccessStatusCode();
        var foundUser = await Context.Users.SingleOrDefaultAsync(user => user.Id == Utilities.UserId);
        foundUser.Should().NotBeNull();
        foundUser!.IsDeleted.Should().Be(true);
    }
}