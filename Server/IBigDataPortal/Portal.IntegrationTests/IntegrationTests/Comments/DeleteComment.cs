using Articles.Contracts.Enums;
using Comments.Domain.CommentsAggregate.Requests;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Portal.IntegrationTests.SeedDatabase;
using Xunit;
using Xunit.Abstractions;

namespace Portal.IntegrationTests.IntegrationTests.Comments;

[Collection("Sequential")]
public class DeleteComment : IntegrationTest
{
    private readonly string Controller = "Comments"; 
    public DeleteComment(CustomWebApplicationFactory factory, ITestOutputHelper output) : base(factory, output)
    {
        
    }
    [Fact]
    public async void ShouldDeleteComment()
    {
        var request = new DeleteCommentRequest()
        {
            CommentId = Utilities.FirstCommentId,
            ArticleId = Utilities.FirstPostId,
            ArticleType = ArticlesEnum.Post
        };
        var response = await Client.PutAsync($"{Controller}/Delete", Utilities.GetRequestContent(request));
        response.EnsureSuccessStatusCode();
        var foundComment = await Context.Comments.FirstOrDefaultAsync(item => item.Id == Utilities.FirstCommentId);
        foundComment.Should().NotBeNull();
        foundComment!.IsDeleted.Should().BeTrue();
    }
}