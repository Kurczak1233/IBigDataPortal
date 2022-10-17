using EduLinks.Domain.EduLinksAggregate.Requests;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRolesDto = UserRole.Contracts.UserRoles.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;
[Collection("Sequential")]
public class UpdateEduLink : IntegrationTest
{
    private readonly string Controller = "EduLinks";

    public UpdateEduLink(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    
    
    [Fact]
    public async void ShouldDeleteEduLink()
    {
        var updatedTitle = "This is some new title";
        var updatedDescription = "This is some basic description";
        var request = new UpdateEduLinkRequest
        {
            EduLinkId = Utilities.FirstEduLinkId,
            Title = updatedTitle,
            Description = updatedDescription,
            CommentsPermissions = UserRolesDto.Nobody,
            VisibilityPermissions = UserRolesDto.Nobody
        };

        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var allEduLinks = await Context.EduLinks.SingleOrDefaultAsync(link => link.Id == Utilities.FirstEduLinkId);
        allEduLinks.Should().NotBeNull();
        allEduLinks!.Title.Should().Be(updatedTitle);
        allEduLinks.Description.Should().Be(updatedDescription);
    }
}