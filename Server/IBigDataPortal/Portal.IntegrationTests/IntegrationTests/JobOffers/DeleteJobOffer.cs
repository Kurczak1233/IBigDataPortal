using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.JobOffers;

[Collection("Sequential")]
public class DeleteJobOffer : IntegrationTest
{
    private readonly string Controller = "JobOffers";

    public DeleteJobOffer(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }

    [Fact]
    public async void ShouldDeleteJobOffer()
    {
        var response = await Client.PutAsync($"{Controller}/Delete/{Utilities.FirstJobOfferId}",
            Utilities.GetRequestContent(null!));
        response.EnsureSuccessStatusCode();
        var foundJobOffer = await Context.JobOffers.SingleOrDefaultAsync(link => link.Id == Utilities.FirstJobOfferId);
        foundJobOffer.Should().NotBeNull();
        foundJobOffer!.IsDeleted.Should().BeTrue();
    }
}