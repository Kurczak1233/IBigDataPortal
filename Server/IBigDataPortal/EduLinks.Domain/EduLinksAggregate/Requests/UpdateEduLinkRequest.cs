namespace EduLinks.Domain.EduLinksAggregate.Requests;

public class UpdateEduLinkRequest
{
    public int EduLinkId { get; set; }
    public string Title { get; set; }
    public string Link { get; set; }
    public string Description { get; set; }
}