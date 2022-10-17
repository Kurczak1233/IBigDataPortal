using System.Text;
using IBigDataPortal.Database;
using Newtonsoft.Json;
using Portal.IntegrationTests.SeedDatabase.Comments;
using Portal.IntegrationTests.SeedDatabase.Cooperations;
using Portal.IntegrationTests.SeedDatabase.EduLinks;
using Portal.IntegrationTests.SeedDatabase.JobOffers;
using Portal.IntegrationTests.SeedDatabase.Posts;
using Portal.IntegrationTests.SeedDatabase.UserRoles;
using Portal.IntegrationTests.SeedDatabase.Users;

namespace Portal.IntegrationTests.SeedDatabase;

public static class Utilities
{
    public enum UserRoles
    {
        Nobody = 0,
        Admin = 1,
        HEI = 2,
        Employee = 3,
        StudentOrBusiness = 4,
        Everybody = 5,
    }

    public static int AdminId { get; set; }
    public static int UserId { get; set; }
    public static int DeletedUserId { get; set; }
    public static int FirstPostId { get; set; }
    public static int SecondPostId { get; set; }
    public static int DeletedPostId { get; set; }
    public static int FirstJobOfferId { get; set; }
    public static int SecondJobOfferId { get; set; }
    public static int DeletedJobOfferId { get; set; }
    public static int FirstEduLinkId { get; set; }
    public static int SecondEduLinkId { get; set; }
    public static int DeletedEduLinkId { get; set; }
    public static int FirstCooperationId { get; set; }
    public static int DeletedCooperationId { get; set; }
    public static int FirstCommentId { get; set; }

    public static async Task InitializeDbForTests(ApplicationDbContext db)
    {
        await UserRolesSeed.AddUserRolesToDb(db);
        await UsersSeed.AddUsersToDb(db);
        await PostsSeed.AddPostsToDb(db);
        await JobOffersSeed.AddJobOffersToDb(db);
        await EduLinksSeed.AddEduLinksToDb(db);
        await CooperationsSeed.AddCooperationsToDb(db);
        await CommentsSeed.AddCommentsToDb(db);
    }

    public static StringContent GetRequestContent(object obj)
    {
        return new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
    }

    public static async Task<T> GetResponseContent<T>(HttpResponseMessage response)
    {
        var stringResponse = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<T>(stringResponse);

        return result;
    }
}