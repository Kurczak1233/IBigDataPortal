import { useState } from "react";

interface ICreatePostFilesLogic {
  setPostsFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const CreatePostFilesLogic = ({ setPostsFiles }: ICreatePostFilesLogic) => {
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false);
  const [comesFromImages, setComesFromDocuments] = useState<boolean>(true);

  const openFileModal = () => {
    setIsFileModalOpen(true);
  };

  const handleRemoveFile = (file: File) => {
    setPostsFiles((newFiles) => {
      newFiles.splice(newFiles.indexOf(file), 1);
      return [...newFiles];
    });
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
    handleRemoveFile,
    comesFromImages,
    setComesFromDocuments,
  };
};

export default CreatePostFilesLogic;
