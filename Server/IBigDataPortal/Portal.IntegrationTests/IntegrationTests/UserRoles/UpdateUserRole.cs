using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using UserRole.Domain.UserRoleAggregate.Requests;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.UserRoles;

[Collection("Sequential")]
public class UpdateUserRole : IntegrationTest
{
    private readonly string Controller = "UserRole"; 
    public UpdateUserRole(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    
    [Fact]
    public async void ShouldUpdatePost()
    {
        var request = new UpdateUserRoleRequest
        {
            UserId = Utilities.UserId,
            RoleId = (int)UserRole.Contracts.UserRoles.UserRoles.Employee
        };

        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var allJobOffers = await Context.Users.SingleOrDefaultAsync(user => user.Id == Utilities.UserId);
        allJobOffers.Should().NotBeNull();
        allJobOffers!.UserRoleId.Should().Be((int)UserRole.Contracts.UserRoles.UserRoles.Employee);
    }
}