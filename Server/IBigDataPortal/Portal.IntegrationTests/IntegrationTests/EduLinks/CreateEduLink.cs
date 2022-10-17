using EduLinks.Domain.EduLinksAggregate.Requests;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRolesDto = UserRole.Contracts.UserRoles.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;

[Collection("Sequential")]
public class CreateEduLink : IntegrationTest
{
    private readonly string Controller = "EduLinks"; 

    public CreateEduLink(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldCreateEduLink()
    {
        string eduLinkTitle = "Test edu link";
        var request = new CreateEduLinkRequest
        {
            Title = eduLinkTitle,
            Description = "Some description",
            CommentsPermissions = UserRolesDto.Nobody,
            VisibilityPermissions = UserRolesDto.Nobody
        };
        
        var response = await Client.PostAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var allEduLinks = await Context.EduLinks.SingleOrDefaultAsync(link => link.Title == eduLinkTitle);
        allEduLinks.Should().NotBeNull();
    }
}