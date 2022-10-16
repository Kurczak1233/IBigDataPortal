using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Posts;

[Collection("Sequential")]
public class DeletePost : IntegrationTest
{
    private readonly string Controller = "Posts";

    public DeletePost(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }

    [Fact]
    public async void ShouldDeletePost()
    {
        var response = await Client.PutAsync($"{Controller}/Delete/{Utilities.FirstPostId}",
            Utilities.GetRequestContent(null!));
        response.EnsureSuccessStatusCode();
        var foundPost = await Context.Posts.SingleOrDefaultAsync(link => link.Id == Utilities.FirstPostId);
        foundPost.Should().NotBeNull();
        foundPost!.IsDeleted.Should().BeTrue();
    }
}