using Articles.Contracts.Enums;
using Comments.Domain.CommentsAggregate.Requests;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Comments;

[Collection("Sequential")]
public class UpdateComment : IntegrationTest
{
    private readonly string Controller = "Comments"; 
    public UpdateComment(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    [Fact]
    public async void ShouldUpdateComment()
    {
        var commentContent = "Haha this is comment content";
        var request = new UpdateCommentRequest()
        {
            CommentId = Utilities.FirstCommentId,
            ArticleId = Utilities.FirstPostId,
            Content = commentContent,
            ArticleType = ArticlesEnum.Post
        };
        var response = await Client.PutAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        Context.Comments.Count(item => item.Content == commentContent).Should().Be(1);
    }
}