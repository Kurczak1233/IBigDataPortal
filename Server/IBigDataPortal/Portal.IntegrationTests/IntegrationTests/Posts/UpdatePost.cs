using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Posts.Domain.PostsAggregate.Requests;
using UserRolesDto = UserRole.Contracts.UserRoles.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Posts;

[Collection("Sequential")]
public class UpdatePost : IntegrationTest
{
    private readonly string Controller = "Posts";

    public UpdatePost(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var updatedTitle = "This is some new title";
        var updatedDescription = "This is some basic description";
        var request = new UpdatePostRequest()
        {
            PostId = Utilities.FirstPostId,
            Title = updatedTitle,
            Description = updatedDescription,
            CommentsPermissions = UserRolesDto.Nobody,
            VisibilityPermissions = UserRolesDto.Nobody
        };

        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var allJobOffers = await Context.Posts.SingleOrDefaultAsync(link => link.Id == Utilities.FirstPostId);
        allJobOffers.Should().NotBeNull();
        allJobOffers!.Title.Should().Be(updatedTitle);
        allJobOffers.Description.Should().Be(updatedDescription);
    }
}