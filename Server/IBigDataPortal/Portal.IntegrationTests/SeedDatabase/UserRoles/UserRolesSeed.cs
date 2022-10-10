using IBigDataPortal.Database;
using UserRole = IBigDataPortal.Database.Entities.UserRole;

namespace Portal.IntegrationTests.SeedDatabase.UserRoles;

public class UserRolesSeed
{
    public static async Task AddUserRolesToDb(ApplicationDbContext db)
    {
        try
        {

            await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
            {
                RoleName = "Admin",
            });
            
            await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
            {
                RoleName = "Member",
            });
            await db.SaveChangesAsync();
            
            
        }
        catch
        {
            throw new Exception("Adding comments failed");
        }
    }
}