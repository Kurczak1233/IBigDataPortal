using IBigDataPortal.Database;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.UserRoles;

public class UserRolesSeed
{
    public static async Task AddUserRolesToDb(ApplicationDbContext db)
    {
        try
        {
            if (!db.UserRole.Any())
            {
                await db.Database.OpenConnectionAsync();
                await db.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.UserRole ON");
                await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
                {
                    RoleName = "Admin",
                    Id = 1,
                });
                await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
                {
                    RoleName = "HEI",
                    Id = 2,
                });
                await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
                {
                    RoleName = "Employee",
                    Id = 3,
                });
                await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
                {
                    RoleName = "Student/Business",
                    Id = 4,
                });
                await db.SaveChangesAsync();
                await db.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.UserRole OFF");
                await db.Database.CloseConnectionAsync();
            }
        }
        catch
        {
            throw new Exception("Adding user roles failed");
        }
    }
}