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
    public async Task<IActionResult> UploadFileToServer()
    {
        string bucketName = "ibigdataportal_files";
        string filePath = @"C:\Test\gcp\cloud\CloudBlobTest.pdf";
        var gcsStorage = StorageClient.Create();
        using (FileStream fs = System.IO.File.OpenRead(filePath))
        {
            string objectName = Path.GetFileName(filePath);
            gcsStorage.UploadObject(bucketName, objectName, null, fs);
            Console.WriteLine($"Uploaded {objectName}.");
        }
        
        // StorageClient storage = StorageClient.Create();
        // ParallelOptions parallelOptions = new ParallelOptions();
        // parallelOptions.MaxDegreeOfParallelism = Environment.ProcessorCount * 2;
        // // int Count = 0;
        // // string directory = “C:\\upload”;
        // // var files = Directory.GetFiles(directory);
        // List<string> fileNames = new List<string>();
        // foreach (var fileName in files) {
        //     filesNames.Add(fileName.Substring(fileName.LastIndexOf(“\\”) + 1));
        // }
        //
        //
        // // List<string> filesInCloudStorage = new List<string>();
        // // foreach (var storageObject in storage.ListObjects(bucketName, “”))
        // // {
        // //     filesInCloudStorage.Add(storageObject.Name);
        // // }
        // //
        // // List<string> filesNotAlreadyInCloudStorage = new List<string>();
        // // filesNotAlreadyInCloudStorage = files2Names.Except(filesInCloudStorage).ToList<string>();
        //
        // Parallel.ForEach(BucketName, parallelOptions, fileName => {
        //     var fileToUpload = directory + “\\” + fileName;
        //     try
        //     {
        //         UploadFile(bucketName, fileToUpload, ref storage);
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine(e.Message);
        //     }
        // } );
        
        // string filePath = @"C:\Test\gcp\cloud\CloudBlobTest.pdf";
        // var gcsStorage = StorageClient.Create();
        // using (var f = File.OpenRead(filePath))
        // {
        //     string objectName = Path.GetFileName(filePath);
        //     gcsStorage.UploadObject(bucketName, objectName, null, f);
        //     Console.WriteLine($"Uploaded {objectName}.");
        // }
        return Ok();
        
        
    }

}