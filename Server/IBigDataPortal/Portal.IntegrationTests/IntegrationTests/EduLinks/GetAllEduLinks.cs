using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Posts.Contracts.ViewModels;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;
[Collection("Sequential")]
public class GetAllEduLinks : IntegrationTest
{
    private readonly string Controller = "EduLinks";

    public GetAllEduLinks(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    
    [Fact]
    public async void ShouldCreateEduLink()
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