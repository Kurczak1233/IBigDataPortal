namespace Files.Domain.FilesAggregate.ViewModels;

public class FileVm
{
    public string Base64FileString { get; set; }
    public Guid Guid { get; set; }
    public int CreatedById { get; set; }
    public bool IsDeleted { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public string Filename { get; set; }
}