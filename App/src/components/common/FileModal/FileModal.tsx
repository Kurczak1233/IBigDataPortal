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
import SmallButton from "../Buttons/SmallButtons/SmallButton";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import SyncToast from "../Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { FileModuleEnum } from "./FileModuleEnum";
import { uploadFile } from "api/FileClient";

interface IFileModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // refId: string;
  moduleId: number;
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
  // moduleId,
  moduleId,
}: // itemId,
// handleItemFiles,
// comesFromDocumentsPage = false,
IFileModal) => {
  const [isExitHoverActive, setIsExitHoverActive] = useState<boolean>(false);
  const [isDropzoneIconHoverActive, setIsDropzoneIconHoverActive] =
    useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const applicationUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  console.log(applicationUser);
  const [isUploading, setIsUploading] = useState<boolean>(false);
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

  const uploadFiles = async () => {
    setIsUploading(true);
    if (!applicationUser) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Application user was not found.",
      });
    }
    await Promise.all(
      myFiles.map(async (fileToUpload) => {
        await addFile(+applicationUser?.id, fileToUpload, moduleId);
      })
    ).then(() => {
      onCloseModal();
      // handleItemFiles(itemId);
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
        <div className={styles.saveButton}>
          <SmallButton
            text={"Submit"}
            onClick={uploadFiles}
            color={AvailableIntensiveColors.IntensiveOrange}
          />
        </div>
      </main>
    </Modal>
  );
};

export default FileModal;
