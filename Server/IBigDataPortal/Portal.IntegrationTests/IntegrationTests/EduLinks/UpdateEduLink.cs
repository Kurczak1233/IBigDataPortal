using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.EduLinks;
[Collection("Sequential")]
public class UpdateEduLink : IntegrationTest
{
    private readonly string Controller = "EduLinks";

    public UpdateEduLink(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
    }
}