import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import FileModalItem from "components/common/FileModal/FileModalItem/FileModalItem";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EditFileComponent.module.scss";
import CreatePostFilesLogic from "./EditFileComponentLogic";

interface IEditFileComponent {
  setPostsFiles: React.Dispatch<React.SetStateAction<File[]>>;
  postFiles: File[];
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
  } = CreatePostFilesLogic({ setPostsFiles });

  return (
    <div className={styles.filesWrapper}>
      <FileModal
        isModalOpen={isFileModalOpen}
        setIsModalOpen={setIsFileModalOpen}
        moduleId={module}
        itemId={0}
        customUploadFiles={temporaryGatherFiles}
        multiple
        currentFiles={postFiles}
      />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Documents</div>
        <SmallButton
          text={"Edit files"}
          onClick={openFileModal}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {postFiles.length > 0 ? (
        postFiles
          .filter((item) => !item.type.includes("image"))
          .map((file) => {
            return (
              <FileModalItem
                key={`${file.lastModified} ${file.name}`}
                removeFile={() => handleRemoveFile(file)}
                file={file}
              />
            );
          })
      ) : (
        <div className={styles.noFilesOrImages}>None</div>
      )}
      <SeparationSmallBar marginTop="32px" marginBottom="32px" />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Images</div>
      </div>
      {postFiles.length > 0 ? (
        postFiles
          .filter((item) => item.type.includes("image"))
          .map((file) => {
            return (
              <FileModalItem
                key={`${file.lastModified} ${file.name}`}
                removeFile={() => handleRemoveFile(file)}
                file={file}
              />
            );
          })
      ) : (
        <div className={styles.noImages}>None</div>
      )}
    </div>
  );
};

export default EditFileComponent;
