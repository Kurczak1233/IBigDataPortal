using Files.Domain.FilesAggregate.Enums;

namespace IBigDataPortal.Database.Entities;

public class FileMetadata : BaseEntity
{
    public string GCPFileName { get; set; }
    public User CreatedBy { get; set; } = null!;
    public int CreatedById { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public FileModuleEnum ModuleEnum { get; set; }
}