using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.EduLinks;

public class EduLinksSeed
{
    public static async Task AddEduLinksToDb(ApplicationDbContext db)
    {
        try
        {
            await db.EduLinks.AddAsync(new EduLink()
            {
                Title = "First edu link",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = false,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Nobody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Admin
            });
            await db.EduLinks.AddAsync(new EduLink
            {
                Title = "Second edu link",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = false,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.EduLinks.AddAsync(new EduLink
            {
                Title = "Deleted edu link",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = true,
                DeletedOn = DateTimeOffset.Now,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.SaveChangesAsync();
            Utilities.FirstEduLinkId =
                ((await db.EduLinks.FirstOrDefaultAsync((item) => item.Title == "First edu link"))!).Id;
            Utilities.SecondEduLinkId =
                ((await db.EduLinks.FirstOrDefaultAsync((item) => item.Title == "Second edu link"))!).Id;
            Utilities.DeletedEduLinkId =
                ((await db.EduLinks.FirstOrDefaultAsync((item) => item.Title == "Deleted edu link"))!).Id;
        }
        catch
        {
            throw new Exception("Adding edu links failed");
        }
    }
}