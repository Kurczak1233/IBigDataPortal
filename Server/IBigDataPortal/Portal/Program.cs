using System.Reflection;
using System.Text;
using IBigDataPortal;
using IBigDataPortal.Infrastructure;
using IBigDataPortal.Infrastructure.Middlewares;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
var connectionString = builder.Configuration.GetConnectionString("SqlConnectionString");
builder.Services.AddDependencies(connectionString);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = "https://dev-lvcenvyd.us.auth0.com/";
    options.Audience = "https://i-big-data-auth-api.com/";
});

builder.Services.AddMediatR(AppDomain.CurrentDomain.GetAsssemblies());
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        corsBuilder =>
        {
            corsBuilder.AllowAnyOrigin().AllowAnyHeader()
                .AllowAnyMethod();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseMiddleware<GetUserContextMiddleware>(connectionString);
app.UseAuthorization();
app.MapControllers();
app.Run();