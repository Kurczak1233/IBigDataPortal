using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Portal.IntegrationTests.SeedDatabase.Posts;

public class PostsSeed
{
    public static async Task AddPostsToDb(ApplicationDbContext db)
    {
        try
        {
            await db.Posts.AddAsync(new Post
            {
                Title = "First post",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = 0,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Nobody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Admin
            });
            await db.Posts.AddAsync(new Post
            {
                Title = "Second post",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = 0,
                DeletedBy = null,
                DeletedOn = null,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.Posts.AddAsync(new Post
            {
                Title = "Deleted post",
                Description = "Some article description",
                CreatorId = Utilities.AdminId,
                Posted = DateTimeOffset.Now,
                IsDeleted = 1,
                DeletedOn = DateTimeOffset.Now,
                CommentsPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody,
                ArticleVisibilityPermissions = UserRole.Contracts.UserRoles.UserRoles.Everybody
            });
            await db.SaveChangesAsync();
            Utilities.FirstPostId = ((await db.Posts.FirstOrDefaultAsync((item) => item.Title == "First post"))!).Id;
            Utilities.SecondPostId = ((await db.Posts.FirstOrDefaultAsync((item) => item.Title == "Second post"))!).Id;
            Utilities.DeletedPostId = ((await db.Posts.FirstOrDefaultAsync((item) => item.Title == "Deleted post"))!).Id;
        }
        catch
        {
            throw new Exception("Adding posts failed");
        }
    }
}