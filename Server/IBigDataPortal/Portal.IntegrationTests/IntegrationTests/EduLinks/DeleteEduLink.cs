using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;

[Collection("Sequential")]
public class DeleteEduLink : IntegrationTest
{
    private readonly string Controller = "EduLinks";

    public DeleteEduLink(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldDeleteEduLink()
    {
        var response = await Client.PutAsync($"{Controller}/Delete/{Utilities.FirstEduLinkId}", Utilities.GetRequestContent(null!));
        response.EnsureSuccessStatusCode();
        var allEduLinks = await Context.EduLinks.SingleOrDefaultAsync(link => link.Id == Utilities.FirstEduLinkId);
        allEduLinks.Should().NotBeNull();
        allEduLinks!.IsDeleted.Should().Be(1);
    }
}