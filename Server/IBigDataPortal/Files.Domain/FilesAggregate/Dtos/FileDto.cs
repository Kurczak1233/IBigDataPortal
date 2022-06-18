using Files.Domain.FilesAggregate.Enums;
using Microsoft.AspNetCore.Http;

namespace Files.Domain.FilesAggregate.Dtos;

public class FileDto
{
    public IFormFile FormFile { get; set; }
    public string FileName { get; set; }
    public FileModuleEnum FileModule { get; set; }
    public string RefId { get; set; }
}