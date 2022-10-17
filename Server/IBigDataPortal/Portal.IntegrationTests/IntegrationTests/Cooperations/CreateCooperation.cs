using Cooperations.Domain.CooperationsAggregate.Requests;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Cooperations;

[Collection("Sequential")]
public class CreateCooperation : IntegrationTest
{
    private readonly string Controller = "Cooperations"; 
    public CreateCooperation(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldCreateCooperation()
    {
        var cooperationTopic = "The topic";
        var request = new RequestRoleForm
        {
            Topic = cooperationTopic,
            Description = "The description"
        };

        var response = await Client.PostAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var foundComment = await Context.Cooperations.FirstOrDefaultAsync(item => item.RequestTopic == cooperationTopic);
        foundComment.Should().NotBeNull();
    }
}