using FluentAssertions;
using JobOffers.Domain.PostsAggregate.Requests;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRolesDto = UserRole.Contracts.UserRoles.UserRoles;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.JobOffers;

[Collection("Sequential")]
public class CreateJobOffer : IntegrationTest
{
    private readonly string Controller = "JobOffers"; 

    public CreateJobOffer(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldCreateJobOffer()
    {
        string jobOfferTitle = "Test job offer";
        var request = new CreateJobOfferRequest()
        {
            Title = jobOfferTitle,
            Description = "Some description",
            CommentsPermissions = UserRolesDto.Nobody,
            VisibilityPermissions = UserRolesDto.Nobody
        };
        
        var response = await Client.PostAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var foundJobOffer = await Context.JobOffers.SingleOrDefaultAsync(link => link.Title == jobOfferTitle);
        foundJobOffer.Should().NotBeNull();
    }
}