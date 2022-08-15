import { removeFile } from "api/FileClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";
import { useState } from "react";

interface ICreatePostFilesLogic {
  setPostsFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
}

const CreatePostFilesLogic = ({ setPostsFiles }: ICreatePostFilesLogic) => {
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);
  const [fileToDelete, setFileToDelete] = useState<FileWithMetadata>();
  const [comesFromImages, setComesFromImages] = useState<boolean>(true);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState<boolean>(false);

  const openFileModal = () => {
    setIsFileModalOpen(true);
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Something went wrong",
      });
    }
    if (!("path" in fileToDelete.file)) {
      await removeFile(fileToDelete.guid);
    }
    setFileToDelete(undefined);
    setPostsFiles((newFiles) => {
      newFiles.splice(newFiles.indexOf(fileToDelete), 1);
      return [...newFiles];
    });
    setIsConfirmDeleteModalOpen(false);
    setFileToDelete(undefined);
  };

  const handleRemoveFile = (file: FileWithMetadata) => {
    setFileToDelete(file);
    setIsConfirmDeleteModalOpen(true);
  };

  const temporaryGatherFiles = (files: File[]) => {
    const modifiedItems = files.map((item) => {
      return { file: item, guid: "" };
    });
    setPostsFiles(modifiedItems);
    setIsFileModalOpen(false);
  };

  return {
    openFileModal,
    setIsFileModalOpen,
    isFileModalOpen,
    temporaryGatherFiles,
    isConfirmDeleteModalOpen,
    setIsConfirmDeleteModalOpen,
    handleRemoveFile,
    confirmDeleteFile,
    comesFromImages,
    setComesFromImages,
  };
};

export default CreatePostFilesLogic;
