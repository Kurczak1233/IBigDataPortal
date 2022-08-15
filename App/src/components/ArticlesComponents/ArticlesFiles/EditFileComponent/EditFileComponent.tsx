import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import FileModalItem from "components/common/FileModal/FileModalItem/FileModalItem";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import {
  documentsExtensions,
  imageExtensions,
} from "components/common/FileModal/SupportedExtensions";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { FileWithMetadata } from "interfaces/Models/FilesMetadata/ViewModels/FileWithMetadata";
import styles from "./EditFileComponent.module.scss";
import CreatePostFilesLogic from "./EditFileComponentLogic";

interface IEditFileComponent {
  setPostsFiles: React.Dispatch<React.SetStateAction<FileWithMetadata[]>>;
  postFiles: FileWithMetadata[];
  module: FileModuleEnum;
}

const EditFileComponent = ({
  setPostsFiles,
  postFiles,
  module,
}: IEditFileComponent) => {
  const {
    setIsFileModalOpen,
    openFileModal,
    isFileModalOpen,
    temporaryGatherFiles,
    handleRemoveFile,
    setIsConfirmDeleteModalOpen,
    isConfirmDeleteModalOpen,
    comesFromImages,
    setComesFromImages,
    confirmDeleteFile,
  } = CreatePostFilesLogic({ setPostsFiles });

  return (
    <div className={styles.filesWrapper}>
      <ConfirmActionModal
        isConfimActionModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmActionModalOpen={setIsConfirmDeleteModalOpen}
        description={"delete this file pernamently"}
        handleConfirmAction={confirmDeleteFile}
      />
      <FileModal
        isModalOpen={isFileModalOpen}
        setIsModalOpen={setIsFileModalOpen}
        moduleId={module}
        itemId={0}
        acceptedFilesExtensions={
          comesFromImages ? imageExtensions : documentsExtensions
        }
        customUploadFiles={temporaryGatherFiles}
        multiple
        currentFiles={postFiles.map((item) => item.file)}
      />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Images</div>
        <SmallButton
          text={"Edit files"}
          onClick={() => {
            setComesFromImages(true);
            openFileModal();
          }}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {postFiles.filter((item) => item.file.type.includes("image")).length >
      0 ? (
        postFiles
          .filter((item) => item.file.type.includes("image"))
          .map((file) => {
            return (
              <FileModalItem
                key={`${file.file.lastModified} ${file.file.name}`}
                removeFile={() => handleRemoveFile(file)}
                file={file.file}
              />
            );
          })
      ) : (
        <div className={styles.noImages}>None</div>
      )}
      <SeparationSmallBar
        marginBottom="16px"
        marginTop="16px"
        color={
          module === FileModuleEnum.jobOffersFiles
            ? AvailableIntensiveColors.IntensiveBlue
            : module === FileModuleEnum.eduLinksFiles
            ? AvailableIntensiveColors.IntensiveGreen
            : module === FileModuleEnum.postsFiles
            ? AvailableIntensiveColors.IntensiveOrange
            : AvailableIntensiveColors.InactiveGray
        }
      />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Documents</div>
        <SmallButton
          text={"Edit documents"}
          onClick={() => {
            setComesFromImages(false);
            openFileModal();
          }}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {postFiles.filter((item) => !item.file.type.includes("image")).length >
      0 ? (
        postFiles
          .filter((item) => !item.file.type.includes("image"))
          .map((file) => {
            return (
              <FileModalItem
                key={`${file.guid} ${file.file.name}`}
                removeFile={() => handleRemoveFile(file)}
                file={file.file}
              />
            );
          })
      ) : (
        <div className={styles.noFilesOrImages}>None</div>
      )}
    </div>
  );
};

export default EditFileComponent;
