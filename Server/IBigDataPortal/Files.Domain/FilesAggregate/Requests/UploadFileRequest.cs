using Files.Contracts.Enums;
using Microsoft.AspNetCore.Http;

namespace Files.Domain.FilesAggregate.Requests;

public class UploadFileRequest
{
    public IFormFile FormFile { get; set; }
    public string FileName { get; set; }
    public string FileType { get; set; }
    public FileModuleEnum FileModule { get; set; }
    public string RefId { get; set; }
}