import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import FileModalItem from "components/common/FileModal/FileModalItem/FileModalItem";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import {
  imageExtensions,
  documentsExtensions,
} from "components/common/FileModal/SupportedExtensions";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./AddFileComponent.module.scss";
import CreatePostFilesLogic from "./AddFileComponentLogic";

interface IAddFileComponent {
  setPostsFiles: React.Dispatch<React.SetStateAction<File[]>>;
  postFiles: File[];
  module: FileModuleEnum;
  componentTitle: string;
}

const AddFileComponent = ({
  setPostsFiles,
  postFiles,
  module,
  componentTitle,
}: IAddFileComponent) => {
  const {
    setIsFileModalOpen,
    openFileModal,
    isFileModalOpen,
    temporaryGatherFiles,
    handleRemoveFile,
    comesFromImages,
    setComesFromDocuments,
  } = CreatePostFilesLogic({ setPostsFiles });

  return (
    <div className={styles.filesWrapper}>
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
        currentFiles={postFiles}
      />
      <AdministartionPageHeader pageTitle={componentTitle} />
      <div className={styles.filesHeader}>
        <div className={styles.files}>Images</div>
        <SmallButton
          text={"Add files"}
          onClick={() => {
            setComesFromDocuments(true);
            openFileModal();
          }}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {postFiles.filter((item) => item.type.includes("image")).length > 0 ? (
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
      <div className={styles.filesHeader}>
        <div className={styles.files}>Documents</div>
        <SmallButton
          text={"Add documents"}
          onClick={() => {
            setComesFromDocuments(false);
            openFileModal();
          }}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {postFiles.filter((item) => !item.type.includes("image")).length > 0 ? (
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
    </div>
  );
};

export default AddFileComponent;
