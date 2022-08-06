import Modal from "react-modal";
import styles from "./FileModal.module.scss";
import GrayExiticon from "public/GrayExitIcon.svg";
import OrangeExiticon from "public/OrangeExitIcon.svg";
import ImportFileGrayIcon from "public/ImportFileGrayIcon.svg";
import ImportFileOrangeIcon from "public/ImportFileOrangeIcon.svg";
import {
  acceptedFilesExtensionsToDisplay,
  acceptedImagesExtensionsToDisplay,
  imageExtensions,
} from "./SupportedExtensions";
import SeparationSmallBar from "../SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import FileModalItem from "./FileModalItem/FileModalItem";
import SmallButton from "../Buttons/SmallButtons/SmallButton";
import FileModalLogic from "./FileModalLogic";
import { Accept } from "react-dropzone";

interface IFileModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: number;
  itemId: number;
  updatePicture?: () => void;
  acceptedFilesExtensions?: Accept;
  multiple?: boolean;
  customUploadFiles?: (file: File[]) => void;
  currentFiles?: File[];
}

const FileModal = ({
  isModalOpen,
  setIsModalOpen,
  moduleId,
  itemId,
  multiple = false,
  acceptedFilesExtensions = imageExtensions,
  customUploadFiles,
  updatePicture,
  currentFiles,
}: IFileModal) => {
  const {
    isExitHoverActive,
    uploadFiles,
    removeFile,
    getRootProps,
    getInputProps,
    isDragActive,
    isDropzoneIconHoverActive,
    setIsDropzoneIconHoverActive,
    setIsExitHoverActive,
    onCloseModal,
    myFiles,
    isUploading,
  } = FileModalLogic({
    setIsModalOpen,
    moduleId,
    acceptedFilesExtensions,
    itemId,
    updatePicture,
    multiple,
    currentFiles,
  });

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
          Files supported:{" "}
          {acceptedFilesExtensions !== imageExtensions
            ? acceptedFilesExtensionsToDisplay
            : acceptedImagesExtensionsToDisplay}
        </span>
        <SeparationSmallBar
          marginBottom="16px"
          marginTop="16px"
          color={AvailableIntensiveColors.IntensiveOrange}
        />
        <div className={styles.uploadedFiles}>
          <div className={styles.uploadedFilesText}>Uploaded files</div>
          {myFiles
            .filter((item) =>
              acceptedFilesExtensions !== imageExtensions
                ? !item.type.includes("image")
                : item.type.includes("image")
            )
            .map((file) => {
              return (
                <FileModalItem
                  key={`${file.lastModified} ${file.name}`}
                  removeFile={removeFile}
                  file={file}
                />
              );
            })}
        </div>
        <div className={styles.saveButton}>
          <SmallButton
            text={"Submit"}
            onClick={() =>
              customUploadFiles ? customUploadFiles(myFiles) : uploadFiles()
            }
            color={AvailableIntensiveColors.IntensiveOrange}
            isLoading={isUploading}
          />
        </div>
      </main>
    </Modal>
  );
};

export default FileModal;
