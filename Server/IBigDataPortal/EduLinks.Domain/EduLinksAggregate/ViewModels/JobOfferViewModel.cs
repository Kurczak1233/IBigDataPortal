namespace JobOffers.Domain.PostsAggregate.ViewModels;

public class EduLinkViewModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Link { get; set; }
    public string Description { get; set; }
    public string UserEmail { get; set; }
    public DateTimeOffset Posted { get; set; } 
}