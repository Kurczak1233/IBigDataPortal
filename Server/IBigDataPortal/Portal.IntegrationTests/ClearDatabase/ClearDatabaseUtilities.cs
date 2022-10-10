using Dapper;
using IBigDataPortal.Database;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.ClearDatabase;

public static class ClearDatabase
{
            public static async Task ClearDatabase(ApplicationDbContext context)
        {
            try
            {
                // THIS ORDER IS IMPORTANT
                var tableNames = new List<string>()
                {
                    $"{nameof(Dbo.Equipments)}",
                    $"{nameof(Dbo.ChecklistAnswers)}",
                    $"{nameof(Dbo.ChecklistLinkUsers)}",
                    $"{nameof(Dbo.Checklists)}",
                    $"{nameof(Dbo.ChangeEvents)}",
                    $"{nameof(Dbo.Deviations)}",
                    $"{nameof(Dbo.ChecklistTemplates)}",
                    $"{nameof(Dbo.ChecklistCategories)}",
                    $"{nameof(Dbo.DeviationCategories)}",
                    $"{nameof(Dbo.DeviationCauses)}",
                    $"{nameof(Dbo.DeviationLocations)}",
                    $"{nameof(Dbo.DeviceNumbers)}",
                    $"{nameof(Dbo.Files)}",
                    $"{nameof(Dbo.FileMappings)}",
                    $"{nameof(Dbo.OrganizationInvites)}",
                    $"{nameof(Dbo.OrganizationRoles)}",
                    $"{nameof(Dbo.OrganizationTimeEntrySettings)}",
                    $"{nameof(Dbo.ProjectColumnPlacement)}",
                    $"{nameof(Dbo.ProjectRoles)}",
                    $"{nameof(Dbo.Roles)}",
                    $"{nameof(Dbo.TaskDependencies)}",
                    $"{nameof(Dbo.TaskUser)}",
                    $"{nameof(Dbo.TimeEntry)}",
                    $"{nameof(Dbo.UserOrganizations)}",
                    $"{nameof(Dbo.UserProjects)}",
                    $"{nameof(Dbo.UserSettings)}",
                    $"{nameof(Dbo.Users)}",
                    $"{nameof(Dbo.Tasks)}",
                    $"{nameof(Dbo.Projects)}",
                    $"{nameof(Dbo.Customers)}",
                    $"{nameof(Dbo.Organizations)}",
                };

                foreach (var tableName in tableNames)
                {
                    await using (var connection = new SqlConnection(context.Database.GetConnectionString()))
                    {
                        await connection.ExecuteAsync($@"IF (EXISTS (SELECT * 
                                                            FROM INFORMATION_SCHEMA.TABLES 
                                                            WHERE TABLE_NAME = '{tableName}'))
                                                            BEGIN
                                                                DELETE FROM {tableName}
                                                            END");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
}