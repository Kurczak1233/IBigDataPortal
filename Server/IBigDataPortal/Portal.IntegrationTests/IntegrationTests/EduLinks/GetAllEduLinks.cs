using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;
[Collection("Sequential")]
public class GetAllEduLinks : IntegrationTest
{
    private readonly string Controller = "EduLinks";

    public GetAllEduLinks(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
}