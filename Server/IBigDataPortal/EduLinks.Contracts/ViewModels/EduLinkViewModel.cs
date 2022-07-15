using Files.Contracts.ViewModels;
using IBigDataPortal.Database.Entities;

namespace EduLinks.Contracts.ViewModels;

public class EduLinkViewModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string UserEmail { get; set; }
    public string Nickname { get; set; }
    public string Type { get; set; }
    public DateTimeOffset Posted { get; set; } 
    public List<FileVm?> Files { get; set; } = new();
    public List<EduLinkCommentViewModel> Comments { get; set; } = new();

}