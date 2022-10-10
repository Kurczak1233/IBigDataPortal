using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Comments;

[Collection("Sequential")]
public class Aaaaa : IntegrationTest
{
    public Aaaaa(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }

    [Fact]
    public async void TestMethod()
    {
        // await using var application = new CustomWebApplicationFactory();
        // using var client = application.CreateClient();
    }
}