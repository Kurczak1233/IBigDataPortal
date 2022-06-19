import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import FileModalItem from "components/common/FileModal/FileModalItem/FileModalItem";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./CreatePostFiles.module.scss";
import CreatePostFilesLogic from "./CreatePostFilesLogic";

interface ICreatePostFiles {
  setPostsFiles: React.Dispatch<React.SetStateAction<File[]>>;
  postFiles: File[];
}

const CreatePostFiles = ({ setPostsFiles, postFiles }: ICreatePostFiles) => {
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
        moduleId={FileModuleEnum.postsFiles}
        itemId={0}
        updatePicture={function (): void {
          throw new Error("Function not implemented.");
        }}
        customUploadFiles={temporaryGatherFiles}
        multiple
        currentFiles={postFiles}
      />
      <AdministartionPageHeader pageTitle={"Post files"} />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Documents</div>
        <SmallButton
          text={"Add files"}
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
                key={file.lastModified}
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
                key={file.lastModified}
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

export default CreatePostFiles;
