import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

const EditPostPageLogic = () => {
  const [postFiles, setPostFiles] = useState<File[]>([]);
  const location = useLocation();
  const state = location.state as PostViewModel;

  const handleMapFilesVmToFiles = (files: FileVm[]) => {
    return files.map((item) => {
      const file = new File(
        [`data:image/png;base64,${item.base64FileString}`],
        item.fileName,
        {
          type: item.fileType,
        }
      );
      return file;
    });
  };

  const handleFileFiles = useCallback((files: FileVm[]) => {
    setPostFiles(handleMapFilesVmToFiles(files));
  }, []);

  useEffect(() => {
    handleFileFiles(state.files);
  }, [handleFileFiles, state]);

  useEffect(() => {
    if (state) {
      handleMapFilesVmToFiles(state.files);
    }
  }, [state]);

  return { state, postFiles, setPostFiles };
};

export default EditPostPageLogic;
