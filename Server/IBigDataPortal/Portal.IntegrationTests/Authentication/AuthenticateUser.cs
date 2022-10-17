using System.Security.Claims;
using System.Text.Encodings.Web;
using IBigDataPortal.Domain.UserMetadata;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portal.IntegrationTests.SeedDatabase;

namespace Portal.IntegrationTests.Authentication;

public class TestAuthHandlerOptions : AuthenticationSchemeOptions
{
    public string DefaultUserId { get; set; } = null!;
}

public class TestAuthHandler : AuthenticationHandler<TestAuthHandlerOptions>
{
    public const string UserId = "UserId";

    public const string AuthenticationScheme = "Test";
    private readonly string _defaultUserId;

    public TestAuthHandler(
        IOptionsMonitor<TestAuthHandlerOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
        _defaultUserId = options.CurrentValue.DefaultUserId;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, "Admin user") };

        // Extract User ID from the request headers if it exists,
        // otherwise use the default User ID from the options.
        claims.Add(new Claim(IUserMetadata.Email, "IntegrationTest@e.pl"));
        claims.Add(new Claim(IUserMetadata.UserId, Utilities.AdminId.ToString()));
        claims.Add(new Claim(ClaimTypes.NameIdentifier, "Integration test"));

        var identity = new ClaimsIdentity(claims, AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, AuthenticationScheme);

        var result = AuthenticateResult.Success(ticket);

        return Task.FromResult(result);
    }
}