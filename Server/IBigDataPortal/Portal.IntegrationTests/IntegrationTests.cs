using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Database;
using Database.Entities.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using One.Mobile.Api;
using One.Module.Permissions.Enums;
using Xunit;
using Xunit.Abstractions;

namespace One.Core.Api.IntegrationTests;

public abstract class IntegrationTest : IClassFixture<CustomWebApplicationFactory<Startup>>
{
    protected readonly CustomWebApplicationFactory<Startup> Factory;
    protected readonly ITestOutputHelper Output;
    protected readonly HttpClient Client;
    protected readonly ApplicationDbContext Context;

    protected IntegrationTest(CustomWebApplicationFactory<Startup> factory, ITestOutputHelper output)
    {
        Factory = factory;
        Output = output;
        Client = Factory.CreateClient();

        var scope = Factory.Services.CreateScope();
        Context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    }
    
    protected async Task ChangeRoleInOrganization(OrganizationRoleEnum organizationRole, int organizationId)
    {
        var userOrganization = Context.UserOrganizations.Single(u =>
            u.UserId == Utilities.UserId && u.OrganizationId == organizationId);
        userOrganization.OrganizationRoleId = (int) organizationRole;
        Context.Entry(userOrganization).State = EntityState.Modified;
        await Context.SaveChangesAsync();
    }

    protected async Task ChangeRoleInProject(ProjectRoleEnum projectRole, int projectId)
    {
        var userProject = Context.UserProjects.Single(u =>
            u.UserId == Utilities.UserId && u.ProjectId == projectId);
        userProject.ProjectRoleId = (int) projectRole;
        Context.Entry(userProject).State = EntityState.Modified;
        await Context.SaveChangesAsync();
    }

    protected async Task RemoveUserFromProject(int userId, int projectId)
    {
        var userProject = Context.UserProjects.Single(u =>
            u.UserId == userId && u.ProjectId == projectId);
        Context.UserProjects.Remove(userProject);
        await Context.SaveChangesAsync();
    }

    protected async Task AddUserToProject(int userId, int projectId, ProjectRoleEnum projectRole)
    {
        var userProject = new UserProject
        {
            ProjectId = projectId,
            UserId = userId,
            ProjectRoleId = (int) projectRole
        };
        await Context.UserProjects.AddAsync(userProject);
        await Context.SaveChangesAsync();
    }
}