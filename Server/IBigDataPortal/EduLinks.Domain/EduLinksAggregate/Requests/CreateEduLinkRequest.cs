namespace EduLinks.Domain.EduLinksAggregate.Requests;

public class CreateEduLinkRequest
{
    public string Title { get; set; }
    public string Link { get; set; }
    public string Description { get; set; }
}