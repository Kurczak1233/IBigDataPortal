import { uploadFile } from "api/FileClient";
import { FileModuleEnum } from "./FileModuleEnum";

export const appendFormData = (
  fileToUpload: File,
  itemId: number,
  module: FileModuleEnum
) => {
  const formData = new FormData();
  formData.append("FormFile", fileToUpload);
  formData.append("FileName", fileToUpload.name);
  formData.append("FileType", fileToUpload.type);
  formData.append("FileModule", module.toString());
  formData.append("RefId", `${itemId}`);
  return formData;
};

export const addFile = async (
  itemId: number,
  myFile: File,
  module: FileModuleEnum
) => {
  const formData = appendFormData(myFile, itemId, module);
  return await uploadFile(formData);
};
