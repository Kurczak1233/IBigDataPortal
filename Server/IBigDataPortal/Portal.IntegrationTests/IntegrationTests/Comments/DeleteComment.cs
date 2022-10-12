using Articles.Domain.ArticlesAggregate.ViewModels;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Comments;

public class DeleteComment : IntegrationTest
{
    private readonly string Controller = "Articles"; 
    public DeleteComment(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    [Fact]
    public async void ShouldGetAllPosts()
    {
        var response = await Client.GetAsync($"{Controller}");
        var articles = await Utilities.GetResponseContent<ArticlesVm>(response);
        articles.Posts.Count().Should().Be(1);
    }
}