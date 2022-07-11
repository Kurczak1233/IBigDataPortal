using EduLinks.Contracts.ViewModels;
using JobOffers.Contracts.ViewModels;
using Posts.Contracts.ViewModels;

namespace Articles.Domain.ArticlesAggregate.ViewModels;

public class ArticlesVm
{
    public IEnumerable<EduLinkViewModel> EduLinks { get; set; }
    public IEnumerable<PostViewModel> Posts { get; set; }
    public IEnumerable<JobOfferViewModel> JobOffers { get; set; }
}