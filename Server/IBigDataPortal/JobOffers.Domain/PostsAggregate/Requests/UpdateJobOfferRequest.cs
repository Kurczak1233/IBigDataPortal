namespace JobOffers.Domain.PostsAggregate.Requests;

public class UpdateJobOfferRequest
{
    public int JobOfferId { get; set; }
    public string Title { get; set; }
    public string Link { get; set; }
    public string Description { get; set; }
}