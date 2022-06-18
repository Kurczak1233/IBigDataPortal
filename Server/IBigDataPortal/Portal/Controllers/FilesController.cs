using Files.Domain.FilesAggregate.Requests;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;


[ApiController]
[Authorize]
[Route("[controller]")]
public class FilesController : ControllerBase
{
    public FilesController()
    {
            
    }

    [HttpPost]
    public async Task<IActionResult> UploadFileToServer([FromForm] UploadFileRequest body)
    {
        string bucketName = "ibigdataportal_files";
        var gcsStorage = StorageClient.Create();
        using (var fileStream = new FileStream("Program.cs", FileMode.Open,
                   FileAccess.Read, FileShare.Read))
        {
            gcsStorage.UploadObject(bucketName, body.FileName, body.FormFile.ContentType, fileStream);
        }
        return Ok();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetFileFromServer([FromForm] UploadFileRequest body)
    {
        string bucketName = "ibigdataportal_files";
        var gcsStorage = StorageClient.Create();
        using (var fileStream = new FileStream("Program.cs", FileMode.Open,
                   FileAccess.Read, FileShare.Read))
        {
            gcsStorage.UploadObject(bucketName, body.FileName, body.FormFile.ContentType, fileStream);
        }
        return Ok();
    }
}