using IBigDataPortal.Database;

namespace Portal.IntegrationTests;

public static class Utilities
{
    public static int UserId { get; set; }
    public static async Task InitializeDbForTests(ApplicationDbContext db)
    {
        
        try
        {

            // await db.Comments.AddAsync(new 
            // {
            //     Content = "HEEELOOOO",
            //     IsDeleted = false,
            //     Creator = null,
            //     CreatorId = 0,
            //     CreatedOn = default,
            //     ArticleType = 0,
            //     ArticleId = 0
            // });
            await db.UserRole.AddAsync(new IBigDataPortal.Database.Entities.UserRole
            {
                RoleName = "xD",
                Users = null
            });
            await db.SaveChangesAsync();
        }
        catch
        {
            throw new Exception("Adding comments failed");
        }
    }

    public static void ReinitializeDbForTests(ApplicationDbContext db)
    {
        // db.Messages.RemoveRange(db.Messages);
        InitializeDbForTests(db);
    }

    // public static List<Message> GetSeedingMessages()
    // {
    //     return new List<Message>()
    //     {
    //         new Message() { Text = "TEST RECORD: You're standing on my scarf." },
    //         new Message() { Text = "TEST RECORD: Would you like a jelly baby?" },
    //         new Message()
    //         {
    //             Text = "TEST RECORD: To the rational mind, " +
    //                    "nothing is inexplicable; only unexplained."
    //         }
    //     };
    // }
}