import FileIcon from "../FileIcon/FileIcon";
import styles from "./FileModalItem.module.scss";
import GrayExiticon from "public/GrayExitIcon.svg";
import OrangeExiticon from "public/OrangeExitIcon.svg";
import FileModalItemLogic from "./FileModalItemLogic";

interface IFileModalItem {
  removeFile: (file: File) => void;
  file: File;
}

const FileModalItem = ({ removeFile, file }: IFileModalItem) => {
  const { setIsExitIconActive, isExitIconActive } = FileModalItemLogic();
  return (
    <div className={styles.fileWrapper}>
      <div className={styles.fileDetails}>
        <FileIcon contentType={file.type} />
        <span className={styles.fileName}>{file.name}</span>
      </div>
      <div
        onMouseEnter={() => setIsExitIconActive(true)}
        onMouseLeave={() => setIsExitIconActive(false)}
        className={styles.exitIconWrapper}
      >
        <img
          src={isExitIconActive ? OrangeExiticon : GrayExiticon}
          alt="Remove file icon"
          onClick={() => removeFile(file)}
        />
      </div>
    </div>
  );
};

export default FileModalItem;
