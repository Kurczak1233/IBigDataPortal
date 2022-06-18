using Files.Domain.FilesAggregate.Dtos;
using Files.Domain.FilesAggregate.Enums;
using Microsoft.AspNetCore.Http;

namespace Files.Domain.FilesAggregate.Requests;

public class UploadFileRequest
{
    public ICollection<FileDto> Files { get; set; }
}