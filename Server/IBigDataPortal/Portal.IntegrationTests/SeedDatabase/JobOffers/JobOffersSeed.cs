using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.JobOffers;

public class JobOffersSeed
{
    public static async Task AddJobOffersToDb(ApplicationDbContext db)
    {
        try
        {
            await db.JobOffers.AddAsync(new JobOffer()
            {
                Title = "First job offer",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = false,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Nobody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Admin
            });
            await db.JobOffers.AddAsync(new JobOffer
            {
                Title = "Second job offer",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = false,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.JobOffers.AddAsync(new JobOffer
            {
                Title = "Deleted job offer",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = true,
                DeletedOn = DateTimeOffset.Now,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.SaveChangesAsync();
            Utilities.FirstJobOfferId = ((await db.JobOffers.FirstOrDefaultAsync((item) => item.Title == "First job offer"))!).Id;
            Utilities.SecondJobOfferId = ((await db.JobOffers.FirstOrDefaultAsync((item) => item.Title == "Second job offer"))!).Id;
            Utilities.DeletedJobOfferId =
                ((await db.JobOffers.FirstOrDefaultAsync((item) => item.Title == "Deleted job offer"))!).Id;
        }
        catch
        {
            throw new Exception("Adding job offers failed");
        }
    }
}