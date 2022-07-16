using Articles.Contracts.Enums;
using Files.Application.Commands;
using Files.Application.Queries;
using Files.Contracts.Enums;
using Files.Domain.FilesAggregate.Requests;
using IBigDataPortal.Domain.UserMetadata;
using IBigDataPortal.Infrastructure.ResourceBasedAuthorization.Handlers.Articles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IBigDataPortal.Controllers;


[ApiController]
[Route("[controller]")]
public class FilesController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUser _user;
    private readonly IAuthorizationService _authorizationService;

    public FilesController(IMediator mediator, IUser user, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _user = user;
        _authorizationService = authorizationService;
    }
    [Authorize]
    [HttpGet("Last/Item/{itemId}/Module/{moduleNumber}")]
    public async Task<IActionResult> GetLastUploadedFileFromServer(int itemId, FileModuleEnum moduleNumber)
    {
        await _authorizationService.AuthorizeAsync(_user.UserClaims, "",
            new PortalAccessAuthorizationRequirement(_user.Id));
        var fileResult = await _mediator.Send(new GetFileQuery(itemId, moduleNumber));
        return Ok(fileResult);
    }
    
    [HttpGet("Item/{itemId}/Module/{moduleNumber}")]
    public async Task<IActionResult> GetAllItemsFiles(int itemId, FileModuleEnum moduleNumber)
    {
        var articleType = (ArticlesEnum)moduleNumber - 1;
        await _authorizationService.AuthorizeAsync(_user.UserClaims, itemId,
            new ArticlesAuthorizationRequirement(itemId, _user.Id, articleType));
        var fileResult = await _mediator.Send(new GetAllFilesQuery(itemId, moduleNumber));
        return Ok(fileResult);
    }
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadFileToServer([FromForm] UploadFileRequest body)
    {
        var articleType = (ArticlesEnum)body.FileModule - 1;
        await _authorizationService.AuthorizeAsync(_user.UserClaims, body,
            new ArticlesAuthorizationRequirement(Int32.Parse(body.RefId), _user.Id, articleType));
        await _mediator.Send(new UploadFileCommand(body, _user.Id));
        return Ok();
    }
    [Authorize]
    [HttpPut("File/{fileId}")]
    public async Task<IActionResult> RemoveFile(string fileId)
    {
        //User file auth (admin / hei + employee)
        await _mediator.Send(new DeleteFileCommand(fileId));
        return Ok();
    }
}