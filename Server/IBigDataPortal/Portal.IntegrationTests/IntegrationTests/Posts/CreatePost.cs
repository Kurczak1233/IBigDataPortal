using FluentAssertions;
using JobOffers.Domain.PostsAggregate.Requests;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRole.Contracts.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Posts;

[Collection("Sequential")]
public class CreatePost : IntegrationTest
{
    private readonly string Controller = "Posts"; 

    public CreatePost(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldCreatePost()
    {
        string postTitle = "Test post";
        var request = new CreateJobOfferRequest()
        {
            Title = postTitle,
            Description = "Some description",
            CommentsPermissions = UserRoles.Nobody,
            VisibilityPermissions = UserRoles.Nobody
        };
        
        var response = await Client.PostAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var foundJobOffer = await Context.Posts.SingleOrDefaultAsync(link => link.Title == postTitle);
        foundJobOffer.Should().NotBeNull();
    }
}