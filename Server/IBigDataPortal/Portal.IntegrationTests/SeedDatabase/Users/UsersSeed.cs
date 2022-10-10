using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.Users;

public static class UsersSeed
{
    public static async Task AddUsersToDb(ApplicationDbContext db)
    {
        try
        {
            await db.Users.AddAsync(new User
            {
                Email = "IntegrationTest@e.pl",
                Nickname = "Integration test",
                UserRoleId = (int)Utilities.UserRoles.Admin,
                IsDeleted = false
            });
            await db.Users.AddAsync(new User
            {
                Email = "StandardUser@e.pl",
                Nickname = "Just a user",
                UserRoleId = (int)Utilities.UserRoles.StudentOrBusiness,
                IsDeleted = false
            });
            await db.Users.AddAsync(new User
            {
                Email = "DeletedUser@e.pl",
                Nickname = "DeletedUser",
                UserRoleId = (int)Utilities.UserRoles.Employee,
                IsDeleted = true
            });
            await db.SaveChangesAsync();
            Utilities.AdminId = ((await db.Users.FirstOrDefaultAsync((item) => item.Nickname == "Integration test"))!).Id;
            Utilities.UserId = ((await db.Users.FirstOrDefaultAsync((item) => item.Nickname == "Just a user"))!).Id;
            Utilities.DeletedUserId = ((await db.Users.FirstOrDefaultAsync((item) => item.Nickname == "DeletedUser"))!).Id;
        }
        catch
        {
            throw new Exception("Adding users failed");
        }
    }
    
    
}