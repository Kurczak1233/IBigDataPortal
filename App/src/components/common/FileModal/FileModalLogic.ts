import { uploadFile } from "api/FileClient";
import { ToastModes } from "interfaces/General/ToastModes";
import { useState, useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import SyncToast from "../Toasts/SyncToast/SyncToast";
import { FileModuleEnum } from "./FileModuleEnum";
import { maxFileSizeInBytes } from "./SupportedExtensions";

interface IFileModalLogic {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: number;
  acceptedFilesExtensions: Accept | undefined;
  itemId: number;
  updatePicture: () => void;
}

const FileModalLogic = ({
  setIsModalOpen,
  moduleId,
  acceptedFilesExtensions,
  itemId,
  updatePicture,
}: IFileModalLogic) => {
  const [isExitHoverActive, setIsExitHoverActive] = useState<boolean>(false);
  const [isDropzoneIconHoverActive, setIsDropzoneIconHoverActive] =
    useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acceptedFiles: any) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const {
    getRootProps,
    isDragReject,
    fileRejections,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    maxSize: maxFileSizeInBytes,
    accept: acceptedFilesExtensions,
  });

  const removeFile = (file: File) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const uploadFiles = async () => {
    setIsUploading(true);
    if (!itemId) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Item id was not found.",
      });
    }
    await Promise.all(
      myFiles.map(async (fileToUpload) => {
        await addFile(itemId, fileToUpload, moduleId);
      })
    ).then(() => {
      onCloseModal();
      updatePicture();
      setIsUploading(false);
    });
  };

  const appendFormData = (
    fileToUpload: File,
    itemId: number,
    module: FileModuleEnum
  ) => {
    const formData = new FormData();
    formData.append("FormFile", fileToUpload);
    formData.append("FileName", fileToUpload.name);
    formData.append("FileModule", module.toString());
    formData.append("RefId", `${itemId}`);
    return formData;
  };

  const addFile = async (
    itemId: number,
    myFile: File,
    module: FileModuleEnum
  ) => {
    const formData = appendFormData(myFile, itemId, module);
    return await uploadFile(formData);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setMyFiles([]);
  };

  const handleDragReject = () => {
    return SyncToast({
      mode: ToastModes.Info,
      description: "This file extension is not supported",
    });
  };
  useEffect(() => {
    if (isDragReject || fileRejections.length > 0) {
      fileRejections.pop();
      handleDragReject();
    }
  }, [isDragReject, fileRejections]);

  return {
    isExitHoverActive,
    uploadFiles,
    removeFile,
    getRootProps,
    getInputProps,
    isDragActive,
    isUploading,
    isDropzoneIconHoverActive,
    setIsDropzoneIconHoverActive,
    setIsExitHoverActive,
    onCloseModal,
    myFiles,
  };
};

export default FileModalLogic;