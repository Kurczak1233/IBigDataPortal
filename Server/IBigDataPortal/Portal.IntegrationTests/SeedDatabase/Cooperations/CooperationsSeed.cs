using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.Cooperations;

public class CooperationsSeed
{
    public static async Task AddCooperationsToDb(ApplicationDbContext db)
    {
        try
        {
            await db.Cooperations.AddAsync(new Cooperation
            {
                CreatorId = Utilities.AdminId,
                RequestTopic = "First cooperation",
                Description = "Some basic description",
                IsArchived = false,
                CreatedOn = DateTimeOffset.Now
            });
            await db.Cooperations.AddAsync(new Cooperation
            {
                CreatorId = Utilities.AdminId,
                RequestTopic = "Deleted cooperation",
                Description = "Some basic description",
                IsArchived = true,
                CreatedOn = DateTimeOffset.Now
            });
            await db.SaveChangesAsync();
            Utilities.FirstCooperation =
                ((await db.Cooperations.FirstOrDefaultAsync((item) => item.RequestTopic == "First cooperation"))!).Id;
            Utilities.DeletedCooperation =
                ((await db.Cooperations.FirstOrDefaultAsync((item) => item.RequestTopic == "Deleted cooperation"))!).Id;
        }
        catch
        {
            throw new Exception("Adding cooperations failed");
        }
    }
}