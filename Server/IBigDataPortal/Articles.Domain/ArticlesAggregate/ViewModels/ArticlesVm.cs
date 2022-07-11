using EduLinks.Contracts.ViewModels;
using JobOffers.Domain.PostsAggregate.ViewModels;
using Posts.Domain.PostsAggregate.ViewModels;

namespace Articles.Domain.ArticlesAggregate.ViewModels;

public class ArticlesVm
{
    public IEnumerable<EduLinkViewModel> EduLinks { get; set; }
    public IEnumerable<PostViewModel> Posts { get; set; }
    public IEnumerable<JobOfferViewModel> JobOffers { get; set; }
}