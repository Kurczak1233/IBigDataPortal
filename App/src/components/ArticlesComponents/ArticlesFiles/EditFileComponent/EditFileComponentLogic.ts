import { removeFile } from "api/FileClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { useState } from "react";

interface ICreatePostFilesLogic {
  setPostsFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const CreatePostFilesLogic = ({ setPostsFiles }: ICreatePostFilesLogic) => {
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);
  const [fileToDelete, setFileToDelete] = useState<File>();
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
    if (!("path" in fileToDelete)) {
      // await removeFile(fileToDelete.guid);
    }
    setFileToDelete(undefined);
    setPostsFiles((newFiles) => {
      newFiles.splice(newFiles.indexOf(fileToDelete), 1);
      return [...newFiles];
    });
    setIsConfirmDeleteModalOpen(false);
    //TODO reove file from db and system
    console.log(fileToDelete);
    //There are new files and the old files...
    setFileToDelete(undefined);
  };

  const handleRemoveFile = (file: File) => {
    setFileToDelete(file);
    setIsConfirmDeleteModalOpen(true);
  };

  const temporaryGatherFiles = (files: File[]) => {
    setPostsFiles(files);
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
  };
};

export default CreatePostFilesLogic;
