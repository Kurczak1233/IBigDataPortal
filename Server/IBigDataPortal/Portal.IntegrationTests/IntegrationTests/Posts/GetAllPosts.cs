using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Posts.Contracts.ViewModels;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Posts;

[Collection("Sequential")]
public class GetAllPosts : IntegrationTest
{
    private readonly string Controller = "Posts";

    public GetAllPosts(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldGetAllActivePosts()
    {
        var response = await Client.GetAsync($"{Controller}");
        response.EnsureSuccessStatusCode();
        var eduLinks = await Utilities.GetResponseContent<IEnumerable<PostViewModel>>(response);
        var postViewModels = eduLinks.ToList();
        postViewModels.Should().BeOfType<List<PostViewModel>>();
        postViewModels.Should().NotBeEmpty();
        postViewModels.Count.Should().Be(2);
    }
}