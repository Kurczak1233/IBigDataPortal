using FluentAssertions;
using JobOffers.Domain.PostsAggregate.Requests;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRolesDto = UserRole.Contracts.UserRoles.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.JobOffers;

[Collection("Sequential")]
public class UpdateJobOffer : IntegrationTest
{
    private readonly string Controller = "JobOffers";

    public UpdateJobOffer(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var updatedTitle = "This is some new title";
        var updatedDescription = "This is some basic description";
        var request = new UpdateJobOfferRequest()
        {
            JobOfferId = Utilities.FirstJobOfferId,
            Title = updatedTitle,
            Description = updatedDescription,
            CommentsPermissions = UserRolesDto.Nobody,
            VisibilityPermissions = UserRolesDto.Nobody
        };

        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var allJobOffers = await Context.JobOffers.SingleOrDefaultAsync(link => link.Id == Utilities.FirstJobOfferId);
        allJobOffers.Should().NotBeNull();
        allJobOffers!.Title.Should().Be(updatedTitle);
        allJobOffers.Description.Should().Be(updatedDescription);
    }
}