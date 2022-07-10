import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const EditEduLinkPageLogic = () => {
  const [eduLinkFiles, setEduLinkFiles] = useState<FileWithMetadata[]>([]);
  const location = useLocation();
  const state = location.state as EduLinkViewModel;

  const handleMapFilesVmToFiles = (files: FileVm[]) => {
    return files.map((item) => {
      const file = new File(
        [`data:image/png;base64,${item.base64FileString}`],
        `${item.fileName}`,
        {
          type: item.fileType,
        }
      );
      return { guid: item.guid, file: file };
    });
  };

  const handleFileFiles = useCallback((files: FileVm[]) => {
    setEduLinkFiles(handleMapFilesVmToFiles(files));
  }, []);

  useEffect(() => {
    handleFileFiles(state.files);
  }, [handleFileFiles, state]);

  useEffect(() => {
    if (state) {
      handleMapFilesVmToFiles(state.files);
    }
  }, [state]);

  return { state, eduLinkFiles, setEduLinkFiles };
};

export default EditEduLinkPageLogic;
