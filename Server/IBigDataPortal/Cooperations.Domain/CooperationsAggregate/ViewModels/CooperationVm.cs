namespace Cooperations.Domain.CooperationsAggregate.ViewModels;

public class CooperationVm
{
    public int Id { get; set; }
    public bool IsArchived { get; set; }
    public int CreatorId { get; set; }
    public string CreatorEmail { get; set; }
    public string RequestTopic { get; set; }
    public string Description { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
}