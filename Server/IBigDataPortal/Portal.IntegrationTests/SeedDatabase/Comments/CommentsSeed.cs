using Articles.Contracts.Enums;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;

namespace Portal.IntegrationTests.SeedDatabase.Comments;

public static class CommentsSeed
{
    public static async Task AddCommentsToDb(ApplicationDbContext db)
    {
        try
        {
            await db.Comments.AddAsync(new Comment()
            {
                Content = "First post comment",
                IsDeleted = false,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.Post,
                ArticleId = Utilities.FirstPostId
            });
            await db.Comments.AddAsync(new Comment()
            {
                Content = "Deleted post comment",
                IsDeleted = true,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.Post,
                ArticleId = Utilities.FirstPostId
            });
            await db.Comments.AddAsync(new Comment()
            {
                Content = "First edu link comment",
                IsDeleted = false,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.EduLink,
                ArticleId = Utilities.FirstEduLinkId
            });
            await db.Comments.AddAsync(new Comment()
            {
                Content = "Deleted edu link comment",
                IsDeleted = true,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.EduLink,
                ArticleId = Utilities.FirstEduLinkId
            });
            await db.Comments.AddAsync(new Comment()
            {
                Content = "First job offer comment",
                IsDeleted = false,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.JobOffer,
                ArticleId = Utilities.FirstJobOfferId
            });
            await db.Comments.AddAsync(new Comment()
            {
                Content = "Deleted job offer comment",
                IsDeleted = true,
                CreatorId = Utilities.AdminId,
                CreatedOn = DateTimeOffset.Now,
                ArticleType = (int)ArticlesEnum.JobOffer,
                ArticleId = Utilities.FirstJobOfferId
            });
          
            await db.SaveChangesAsync();
        }
        catch
        {
            throw new Exception("Adding comments failed");
        }
    }
}