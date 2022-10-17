using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Cooperations;

[Collection("Sequential")]
public class ArchiveCooperation : IntegrationTest
{
    private readonly string Controller = "Cooperations"; 
    public ArchiveCooperation(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    
    [Fact]
    public async void ShouldArchiveCooperation()
    {
        var response = await Client.PutAsync($"{Controller}/{Utilities.FirstCooperationId}", Utilities.GetRequestContent(null!));
        response.EnsureSuccessStatusCode();
        var foundComment = await Context.Cooperations.FirstOrDefaultAsync(item => item.Id == Utilities.FirstCooperationId);
        foundComment.Should().NotBeNull();
        foundComment!.IsArchived.Should().BeTrue();
    }
}