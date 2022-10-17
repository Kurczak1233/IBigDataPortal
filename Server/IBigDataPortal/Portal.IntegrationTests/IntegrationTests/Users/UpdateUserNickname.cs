using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Users.Domain.UsersAggregate.Requests;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Users;

[Collection("Sequential")]
public class UpdateUserNickname: IntegrationTest
{
    private readonly string Controller = "Users"; 

    public UpdateUserNickname(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
      
    [Fact]
    public async void ShouldUpdatePost()
    {
        var request = new UpdateNicknameRequest
        {
            Nickname = "Test"
        };
        
        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var foundUsers = await Context.Users.SingleOrDefaultAsync((item) => item.Id == Utilities.AdminId);
        foundUsers.Should().NotBeNull();
        foundUsers!.Nickname.Should().Be("Test");
    }
}