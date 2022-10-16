using Articles.Contracts.Enums;
using Comments.Domain.CommentsAggregate.Requests;
using FluentAssertions;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Comments;

[Collection("Sequential")]
public class CreateComment : IntegrationTest
{
    private readonly string Controller = "Comments"; 
    public CreateComment(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    [Fact]
    public async void ShouldCreateComment()
    {
        var commentContent = "Test comment"; 
        var request = new CreateCommentRequest
        {
            Content = commentContent,
            ArticleId = Utilities.FirstEduLinkId,
            ArticleType = ArticlesEnum.EduLink
        };

        var response = await Client.PostAsync($"{Controller}", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        Context.Comments.Count(item => item.Content == commentContent).Should().Be(1);
    }
}