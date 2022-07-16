using Articles.Domain.ArticlesAggregate.ViewModels;
using Dapper;
using EduLinks.Contracts.ViewModels;
using IBigDataPortal.Database;
using IBigDataPortal.Database.Entities;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure;
using JobOffers.Contracts.ViewModels;
using MediatR;
using Posts.Contracts.ViewModels;
using UserRole.Contracts.UserRoles;
using User = IBigDataPortal.Database.Entities.User;
using UsersRole = IBigDataPortal.Database.Entities.UserRole;

namespace Articles.Application.Queries;

public class GetAllArticlesQuery : IRequest<ArticlesVm>
{
}

public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, ArticlesVm>
{
    private readonly ISqlConnectionService _connectionService;
    private readonly IUser _user;

    public GetAllArticlesQueryHandler(ISqlConnectionService connectionService, IUser user)
    {
        _connectionService = connectionService;
        _user = user;
    }

    public async Task<ArticlesVm> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetAsync();
        var userRoleId = (int)UserRoles.Everybody;
        if (_user.Id != 0)
        {
            var sql =
                $@"SELECT {Dbo.UserRole}.{nameof(UsersRole.Id)}
                FROM {Dbo.UserRole}
                JOIN {Dbo.Users}
                ON {Dbo.Users}.{nameof(User.UserRoleId)} = {Dbo.UserRole}.{nameof(UsersRole.Id)}
                WHERE {Dbo.Users}.{nameof(User.Id)} = @userId";
            userRoleId = await connection.QuerySingleOrDefaultAsync<int>(sql,
                new
                {
                    userId = _user.Id,
                }); 
        }

        var jobOffers = await GetAllJobOffers();
        var eduLinks = await GetAllEduLinks();
        var posts = await GetAllPosts();

        var jobOffersFiltered = jobOffers.Where((item) => (int)item.ArticleVisibilityPermissions >= userRoleId);
        var eduLinksFiltered = eduLinks.Where((item) => (int)item.ArticleVisibilityPermissions >= userRoleId);
        var postsOffersFiltered = posts.Where((item) => (int)item.ArticleVisibilityPermissions >= userRoleId);
        
        return new ArticlesVm()
        {
            JobOffers = jobOffersFiltered,
            EduLinks = eduLinksFiltered,
            Posts = postsOffersFiltered,
        };
    }

    private async Task<IEnumerable<PostViewModel>> GetAllPosts()
    {
        var connection = await _connectionService.GetAsync();
        var postsSql = $@"SELECT {Dbo.Posts}.{nameof(Post.Title)},
                     {Dbo.Posts}.{nameof(Post.Description)},
                     {Dbo.Posts}.{nameof(Post.Id)},
                     {Dbo.Posts}.{nameof(Post.Posted)},
                     {Dbo.Posts}.{nameof(Post.CreatorId)},
                     {Dbo.Posts}.{nameof(Post.CommentsPermissions)},
                     {Dbo.Posts}.{nameof(Post.ArticleVisibilityPermissions)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'Post' as Type,
                     {Dbo.Comments}.{nameof(Comment.Id)} as CommentId,
                     {Dbo.Comments}.{nameof(Comment.Content)},
                     {Dbo.Comments}.{nameof(Comment.IsDeleted)},
                     {Dbo.Comments}.{nameof(Comment.CreatedOn)},
                     {Dbo.Comments}.{nameof(Comment.CreatorId)},
                     CommentUsers.Nickname as CommentatorNickname,
                     CommentUsers.Email as CommentatorEmail
                     FROM {Dbo.Posts} JOIN {Dbo.Users}
                     ON {Dbo.Posts}.{nameof(Post.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.Comments} ON {Dbo.Posts}.{nameof(Post.Id)} = {Dbo.Comments}.{nameof(Comment.ArticleId)}
                     LEFT JOIN {Dbo.Users} as CommentUsers ON CommentUsers.{nameof(User.Id)} = {Dbo.Comments}.{nameof(Comment.CreatorId)}
                     WHERE {Dbo.Posts}.{nameof(Post.IsDeleted)} = 0
                     AND ({Dbo.Comments}.{nameof(Comment.IsDeleted)} = 1 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} = 0 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} IS NULL)";

        var result = await connection.QueryAsync<PostViewModel, PostCommentViewModel, PostViewModel>(postsSql,
            (post, comment) =>
            {
                if (comment != null && comment.IsDeleted == false)
                {
                    post.Comments.Add(comment);
                }

                return post;
            }, splitOn: "CommentId");

        var posts = result.GroupBy(p => p.Id).Select(g =>
        {
            var groupedPost = g.First();
            var foundComments = g.Select(p => p.Comments.Count != 0 ? p.Comments.Single() : null).ToList();
            var allComments = foundComments.FindAll(item => item != null);
            if (allComments.Count != 0)
            {
                groupedPost.Comments = allComments;
            }

            return groupedPost;
        });

        return posts;
    }

    private async Task<IEnumerable<JobOfferViewModel>> GetAllJobOffers()
    {
        var connection = await _connectionService.GetAsync();

        var jobOfferSql = $@"SELECT {Dbo.JobOffers}.{nameof(JobOffer.Title)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Description)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Id)},
                     {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)},
                     {Dbo.JobOffers}.{nameof(JobOffer.Posted)},
                     {Dbo.JobOffers}.{nameof(JobOffer.CommentsPermissions)},
                     {Dbo.JobOffers}.{nameof(JobOffer.ArticleVisibilityPermissions)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'JobOffer' as Type,
                     {Dbo.Comments}.{nameof(Comment.Id)} as CommentId,
                     {Dbo.Comments}.{nameof(Comment.Content)},
                     {Dbo.Comments}.{nameof(Comment.IsDeleted)},
                     {Dbo.Comments}.{nameof(Comment.CreatedOn)},
                     {Dbo.Comments}.{nameof(Comment.CreatorId)},
                     CommentUsers.Nickname as CommentatorNickname,
                     CommentUsers.Email as CommentatorEmail
                     FROM {Dbo.JobOffers} JOIN {Dbo.Users}
                     ON {Dbo.JobOffers}.{nameof(JobOffer.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.Comments} ON {Dbo.JobOffers}.{nameof(JobOffer.Id)} = {Dbo.Comments}.{nameof(Comment.ArticleId)}
                     LEFT JOIN {Dbo.Users} as CommentUsers ON CommentUsers.{nameof(User.Id)} = {Dbo.Comments}.{nameof(Comment.CreatorId)}
                     WHERE {Dbo.JobOffers}.{nameof(JobOffer.IsDeleted)} = 0
                     AND ({Dbo.Comments}.{nameof(Comment.IsDeleted)} = 1 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} = 0 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} IS NULL)";

        var result = await connection.QueryAsync<JobOfferViewModel, JobOfferCommentViewModel, JobOfferViewModel>(
            jobOfferSql, (jobOffer, comment) =>
            {
                if (comment != null && comment.IsDeleted == false)
                {
                    jobOffer.Comments.Add(comment);
                }

                return jobOffer;
            }, splitOn: "CommentId");

        var jobOffers = result.GroupBy(p => p.Id).Select(g =>
        {
            var groupedPost = g.First();
            var foundComments = g.Select(p => p.Comments.Count != 0 ? p.Comments.Single() : null).ToList();
            var allComments = foundComments.FindAll(item => item != null);
            if (allComments.Count != 0)
            {
                groupedPost.Comments = allComments;
            }

            return groupedPost;
        });

        return jobOffers;
    }

    private async Task<IEnumerable<EduLinkViewModel>> GetAllEduLinks()
    {
        var connection = await _connectionService.GetAsync();

        var eduLinksSql = $@"SELECT {Dbo.EduLinks}.{nameof(EduLink.Title)},
                     {Dbo.EduLinks}.{nameof(EduLink.Description)},
                     {Dbo.EduLinks}.{nameof(EduLink.Id)},
                     {Dbo.EduLinks}.{nameof(EduLink.CreatorId)},
                     {Dbo.EduLinks}.{nameof(EduLink.Posted)},
                     {Dbo.EduLinks}.{nameof(EduLink.CommentsPermissions)},
                     {Dbo.EduLinks}.{nameof(EduLink.ArticleVisibilityPermissions)},
                     {Dbo.Users}.{nameof(User.Email)} as UserEmail,
                     {Dbo.Users}.{nameof(User.Nickname)},
                     'EduLink' as Type,
                     {Dbo.Comments}.{nameof(Comment.Id)} as CommentId,
                     {Dbo.Comments}.{nameof(Comment.Content)},
                     {Dbo.Comments}.{nameof(Comment.IsDeleted)},
                     {Dbo.Comments}.{nameof(Comment.CreatedOn)},
                     {Dbo.Comments}.{nameof(Comment.CreatorId)},
                     CommentUsers.Nickname as CommentatorNickname,
                     CommentUsers.Email as CommentatorEmail
                     FROM {Dbo.EduLinks} JOIN {Dbo.Users}
                     ON {Dbo.EduLinks}.{nameof(EduLink.CreatorId)} = {Dbo.Users}.{nameof(User.Id)}
                     LEFT JOIN {Dbo.Comments} ON {Dbo.EduLinks}.{nameof(EduLink.Id)} = {Dbo.Comments}.{nameof(Comment.ArticleId)}
                     LEFT JOIN {Dbo.Users} as CommentUsers ON CommentUsers.{nameof(User.Id)} = {Dbo.Comments}.{nameof(Comment.CreatorId)}
                     WHERE {Dbo.EduLinks}.{nameof(EduLink.IsDeleted)} = 0
                     AND ({Dbo.Comments}.{nameof(Comment.IsDeleted)} = 1 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} = 0 OR {Dbo.Comments}.{nameof(Comment.IsDeleted)} IS NULL)";

        var result = await connection.QueryAsync<EduLinkViewModel, EduLinkCommentViewModel, EduLinkViewModel>(
            eduLinksSql, (eduLink, comment) =>
            {
                if (comment != null && comment.IsDeleted == false)
                {
                    eduLink.Comments.Add(comment);
                }

                return eduLink;
            }, splitOn: "CommentId");

        var eduLinks = result.GroupBy(p => p.Id).Select(g =>
        {
            var groupedPost = g.First();
            var foundComments = g.Select(p => p.Comments.Count != 0 ? p.Comments.Single() : null).ToList();
            var allComments = foundComments.FindAll(item => item != null);
            if (allComments.Count != 0)
            {
                groupedPost.Comments = allComments;
            }

            return groupedPost;
        });

        return eduLinks;
    }
}