using Articles.Contracts.Enums;
using Dapper;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Models;

namespace IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Utils;

public class GetArticlesPermissions
{
    private readonly ISqlConnectionService _connectionService;

    public GetArticlesPermissions(ISqlConnectionService connectionService)
    {
        _connectionService = connectionService;
    }


    public async Task<int> HandleGetCommentOwner(int commentId)
    {
        var connection = await _connectionService.GetAsync();

        var sql =
            $@"SELECT {Dbo.Comments}.{nameof(Comment.Id)}
                FROM {Dbo.Comments}
                WHERE {Dbo.Comments}.{nameof(Comment.Id)} = @commentId";
        return await connection.QuerySingleOrDefaultAsync<int>(sql,
            new
            {
                commentId,
            });
    }

    public async Task<ArticlePermissionsModel> HandleGetArticlesPermissions(ArticlesEnum articleType, int articleId)
    {
        ArticlePermissionsModel permissionsModel = new();
        switch (articleType)
        {
            case ArticlesEnum.Post:
            {
                permissionsModel = await GetPostPermissions(articleId);
                break;
            }
            case ArticlesEnum.JobOffer:
            {
                permissionsModel = await GetJobOfferPermissions(articleId);
                break;
            }
            case ArticlesEnum.EduLink:
            {
                permissionsModel = await GetEduLinksPermissions(articleId);
                break;
            }
        }

        ;
        return permissionsModel;
    }

    private async Task<ArticlePermissionsModel> GetPostPermissions(int articleId)
    {
        var connection = await _connectionService.GetAsync();

        var sql =
            $@"SELECT {nameof(Post.CommentsPermissions)},
                {nameof(Post.ArticleVisibilityPermissions)},
                {nameof(Post.CreatorId)},
                {nameof(Post.IsDeleted)}
                FROM {Dbo.Posts}
                WHERE {nameof(Post.Id)} = @articleId";
        return await connection.QuerySingleOrDefaultAsync<ArticlePermissionsModel>(sql,
            new
            {
                articleId,
            });
    }

    private async Task<ArticlePermissionsModel> GetJobOfferPermissions(int articleId)
    {
        var connection = await _connectionService.GetAsync();

        var sql =
            $@"SELECT {Dbo.JobOffers}.{nameof(JobOffer.CommentsPermissions)},
                {Dbo.JobOffers}.{nameof(JobOffer.ArticleVisibilityPermissions)},
                {Dbo.Posts}.{nameof(Post.CreatorId)},
                {Dbo.JobOffers}.{nameof(JobOffer.IsDeleted)}
                FROM {Dbo.JobOffers}
                WHERE {Dbo.JobOffers}.{nameof(JobOffer.Id)} = @articleId";
        return await connection.QuerySingleOrDefaultAsync<ArticlePermissionsModel>(sql,
            new
            {
                articleId,
            });
    }

    private async Task<ArticlePermissionsModel> GetEduLinksPermissions(int articleId)
    {
        var connection = await _connectionService.GetAsync();

        var sql =
            $@"SELECT {Dbo.EduLinks}.{nameof(EduLink.CommentsPermissions)},
                {Dbo.EduLinks}.{nameof(EduLink.ArticleVisibilityPermissions)},
                {Dbo.Posts}.{nameof(Post.CreatorId)},
                {Dbo.EduLinks}.{nameof(EduLink.IsDeleted)}
                FROM {Dbo.EduLinks}
                WHERE {Dbo.EduLinks}.{nameof(EduLink.Id)} = @articleId";
        return await connection.QuerySingleOrDefaultAsync<ArticlePermissionsModel>(sql,
            new
            {
                articleId,
            });
    }
}