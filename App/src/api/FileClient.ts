import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { HttpRequestsMethods } from "interfaces/General/HttpRequestsMethods";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import application from "../authenticationConfig.json";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Files = "Files";

const uploadFile = async (body: FormData): Promise<null> => {
  return AxiosClient(HttpRequestsMethods.POST, `${Files}`, base, {
    body: body,
    requestContaisFile: true,
  });
};

const getLastUploadedFileFromServer = async (
  itemId: number,
  moduleNumber: FileModuleEnum
): Promise<FileVm> => {
  return AxiosClient(
    HttpRequestsMethods.GET,
    `${Files}/Last/Item/${itemId}/Module/${moduleNumber}`,
    base
  );
};

const getAllItemsFiles = async (
  itemId: number,
  moduleNumber: FileModuleEnum
): Promise<FileVm> => {
  return AxiosClient(
    HttpRequestsMethods.GET,
    `${Files}/Item/${itemId}/Module/${moduleNumber}`,
    base
  );
};

const removeFile = async (fileId: string): Promise<FileVm> => {
  return AxiosClient(HttpRequestsMethods.PUT, `${Files}/File/${fileId}`, base);
};

export {
  uploadFile,
  getLastUploadedFileFromServer,
  removeFile,
  getAllItemsFiles,
};
