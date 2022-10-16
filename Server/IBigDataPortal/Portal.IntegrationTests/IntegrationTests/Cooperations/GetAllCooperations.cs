using Cooperations.Domain.CooperationsAggregate.ViewModels;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Cooperations;

[Collection("Sequential")]
public class GetAllCooperations : IntegrationTest
{
    private readonly string Controller = "Cooperations"; 
    public GetAllCooperations(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
    
    [Fact]
    public async void ShouldGetAllCooperations()
    {
        var response = await Client.GetAsync($"{Controller}");
        response.EnsureSuccessStatusCode();
        var allCooperations = await Utilities.GetResponseContent<IEnumerable<CooperationVm>>(response);
        allCooperations.Count().Should().Be(2);
    }
}