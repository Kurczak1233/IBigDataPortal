namespace JobOffers.Domain.PostsAggregate.Requests;

public class CreateJobOfferRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
}