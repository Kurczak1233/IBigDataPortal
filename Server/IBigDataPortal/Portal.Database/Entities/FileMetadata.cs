using System.ComponentModel.DataAnnotations;
using Files.Domain.FilesAggregate.Enums;

namespace IBigDataPortal.Database.Entities;

public class FileMetadata 
{
    [Key]
    public Guid Guid { get; set; }
    public string FileName { get; set; }
    public User CreatedBy { get; set; } = null!;
    public int CreatedById { get; set; }
    public string FileType { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public int RefId { get; set; }
    public FileModuleEnum ModuleEnum { get; set; }
    public bool IsDeleted { get; set; } = false;
}