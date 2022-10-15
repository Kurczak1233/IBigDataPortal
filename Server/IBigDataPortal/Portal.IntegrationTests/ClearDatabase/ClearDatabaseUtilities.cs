using Dapper;
using IBigDataPortal.Database;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.ClearDatabase;

public static class ClearDatabaseUtilities
{
    public static async Task ClearDatabase(ApplicationDbContext context)
    {
        try
        {
            // THIS ORDER IS IMPORTANT
            var tableNames = new List<string>()
            {
                $"{nameof(Dbo.Comments)}",
                $"{nameof(Dbo.Posts)}",
                $"{nameof(Dbo.JobOffers)}",
                $"{nameof(Dbo.EduLinks)}",
                $"{nameof(Dbo.Cooperations)}",
                $"{nameof(Dbo.FilesMetadata)}",
                $"{nameof(Dbo.Users)}",
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