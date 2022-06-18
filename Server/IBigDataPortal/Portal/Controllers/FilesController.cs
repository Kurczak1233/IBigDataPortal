using Files.Application.Commands;
using Files.Domain.FilesAggregate.Requests;
using Google.Cloud.Storage.V1;
using IBigDataPortal.Domain.UserMetadata;
using JobOffers.Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;


[ApiController]
[Authorize]
[Route("[controller]")]
public class FilesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    public FilesController(IMediator mediator, IUser user)
    {
        _mediator = mediator;
        _user = user;
    }

    [HttpPost]
    public async Task<IActionResult> UploadFileToServer([FromForm] UploadFileRequest body)
    {
        await _mediator.Send(new UploadFileCommand(body, _user.Id));
        return Ok();
    }
    
    [HttpGet]
    public async Task<IActionResult> GetFileFromServer()
    {
        string bucketName = "ibigdataportal_files";
        
        string objectBlobName = "profilowe.png";
        var gcsStorage = StorageClient.Create();
        var memoryStream = new MemoryStream();
        await gcsStorage.DownloadObjectAsync(bucketName, objectBlobName, memoryStream);
        var fileInBytes = memoryStream.ToArray();
        string tempinBase64 = Convert.ToBase64String(fileInBytes);
        return Ok(tempinBase64);
    }
}