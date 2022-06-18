import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import styles from "./FileModal.module.scss";
import { useCallback, useState } from "react";
import GrayExiticon from "public/GrayExitIcon.svg";
import OrangeExiticon from "public/OrangeExitIcon.svg";
import ImportFileGrayIcon from "public/ImportFileGrayIcon.svg";
import ImportFileOrangeIcon from "public/ImportFileOrangeIcon.svg";
import { acceptedFilesExtensionsToDisplay } from "./SupportedExtensions";
import SeparationSmallBar from "../SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import FileModalItem from "./FileModalItem/FileModalItem";

// import {
//   acceptedFileExtensions,
//   acceptedFilesExtensionsToDisplay,
//   maxFileSizeInBytes,
// } from "one-common-components/lib/constants/Files";
// import ClipLoader from "react-spinners/ClipLoader";
// import { formatBytes } from "one-common-components/lib/constants/MathFunctions";
// import FileIcon from "one-common-components/lib/constants/FileIcon/FileIcon";
// import DragAndDropIcon from "src/Images/Green-drag-and-drop-icon.svg";
// import { addFile } from "src/Api/Requests/FilesRequests/AddNewFileRequest";
// import { useParams } from "react-router-dom";
// import { Params } from "src/Models/Params";
// import AvailableDocumentsToUpload from "src/Components/Common/AvailableDocumentsToUpload/AvailableDocumentsToUpload";

interface IFileModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // refId: string;
  // moduleId: number;
  // itemId: number;
  // comesFromDocumentsPage?: boolean;
  // handleItemFiles: (
  //   selectedDeviation: number,
  //   projectId: number
  // ) => Promise<void>;
}

const FileModal = ({
  isModalOpen,
  setIsModalOpen,
}: // itemId,
// moduleId,
// handleItemFiles,
// comesFromDocumentsPage = false,
IFileModal) => {
  const [isExitHoverActive, setIsExitHoverActive] = useState<boolean>(false);
  const [isDropzoneIconHoverActive, setIsDropzoneIconHoverActive] =
    useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // const { id } = useParams();
  // const { projectId, id } = useParams<Params>();
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // maxSize: maxFileSizeInBytes,
    // accept: acceptedFileExtensions,
  });

  const removeFile = (file: File) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  // const uploadFiles = async () => {
  //   setIsUploading(true);
  //   await Promise.all(
  //     myFiles.map(async (fileToUpload) => {
  //       await addFile(+itemId, fileToUpload, moduleId, +id, +projectId);
  //     })
  //   ).then(() => {
  //     onCloseModal();
  //     handleItemFiles(itemId, +projectId);
  //     setIsUploading(false);
  //   });
  // };

  // const appendFormData = (
  //   fileToUpload: File,
  //   itemId: number,
  //   module: FileModuleEnum,
  //   organizationId: number,
  //   projectId?: number,
  //   groupIndex?: number,
  //   questionIndex?: number
  // ) => {
  //   const formData = new FormData();
  //   formData.append("FormFile", fileToUpload);
  //   formData.append("FileName", fileToUpload.name);
  //   formData.append("OrganizationId", organizationId.toString());
  //   projectId && formData.append("ProjectId", projectId.toString());
  //   // formData.append("FileModule", `${FileModuleEnum[module]}`);
  //   formData.append("RefId", `${itemId}`);
  //   groupIndex && formData.append("GroupIndex", groupIndex.toString());
  //   questionIndex && formData.append("QuestionIndex", questionIndex.toString());
  //   return formData;
  // };

  // const addFile = async (
  //   itemId: number,
  //   myFile: File,
  //   // module: FileModuleEnum,
  //   organizationId: number,
  //   projectId?: number,
  //   groupIndex?: number,
  //   questionIndex?: number
  // ) => {
  //   const formData = appendFormData(
  //     myFile,
  //     itemId,
  //     module,
  //     organizationId,
  //     projectId,
  //     groupIndex,
  //     questionIndex
  //   );
  //   return await uploadFile(formData);
  // };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setMyFiles([]);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      className={styles.fileModal}
      overlayClassName={styles.fileModalOverlay}
      ariaHideApp={false}
    >
      <header className={styles.titleSection}>
        <div className={styles.modalTitle}>Upload file</div>
        <div
          onClick={onCloseModal}
          onMouseEnter={() => setIsExitHoverActive(true)}
          onMouseLeave={() => setIsExitHoverActive(false)}
        >
          <img
            src={isExitHoverActive ? OrangeExiticon : GrayExiticon}
            alt="Close modal icon"
          />
        </div>
      </header>
      <main>
        <div
          {...getRootProps(
            isDragActive
              ? { className: styles.dropzoneActive }
              : { className: styles.dropzone }
          )}
          onMouseEnter={() => setIsDropzoneIconHoverActive(true)}
          onMouseLeave={() => setIsDropzoneIconHoverActive(false)}
        >
          <input {...getInputProps()} />
          <div>
            <img
              height={32}
              width={32}
              src={
                isDropzoneIconHoverActive || isDragActive
                  ? ImportFileOrangeIcon
                  : ImportFileGrayIcon
              }
              alt=" Drag and drop icon"
              className="drag-and-drop-icon"
            />
          </div>
          <span className={styles.dropzoneText}>
            Drag file here or click to browse files
          </span>
        </div>
        <span className={styles.filesSupported}>
          Files supported: {acceptedFilesExtensionsToDisplay}
        </span>
        <SeparationSmallBar
          marginBottom="16px"
          marginTop="16px"
          color={AvailableIntensiveColors.IntensiveOrange}
        />
        <div className={styles.uploadedFiles}>
          <div className={styles.uploadedFilesText}>Uploaded files</div>
          {myFiles.map((file) => {
            return (
              <FileModalItem
                key={file.lastModified}
                removeFile={removeFile}
                file={file}
              />
            );
          })}
        </div>
      </main>

      {/* <div className="buttons-container">
          <button onClick={onCloseModal} className="cancel">
            Cancel
          </button>
          <button
            onClick={uploadFiles}
            disabled={myFiles.length === 0}
            className="upload"
          >
            {!isUploading ? (
              "Upload"
            ) : (
              <ClipLoader color={"#33ca75"} loading={true} size={15} />
            )}
          </button>
        </div> */}
    </Modal>
  );
};

export default FileModal;
