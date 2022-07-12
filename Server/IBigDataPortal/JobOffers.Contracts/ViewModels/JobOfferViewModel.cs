using Files.Contracts.ViewModels;

namespace JobOffers.Contracts.ViewModels;

public class JobOfferViewModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Link { get; set; }
    public string Description { get; set; }
    public string UserEmail { get; set; }
    public string Nickname { get; set; }
    public string Type { get; set; }
    public DateTimeOffset Posted { get; set; } 
    public List<FileVm?> Files { get; set; } = new();
}