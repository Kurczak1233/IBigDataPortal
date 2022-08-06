import JpgIcon from "public/FileTypeIcones/jpg.svg";
import PngIcon from "public/FileTypeIcones/png.svg";
import ExcelIcon from "public/FileTypeIcones/ms-excel.svg";
import WordIcon from "public/FileTypeIcones/ms-word.svg";
import PowerPointIcon from "public/FileTypeIcones/ms-powerpoint.svg";
import PdfIcon from "public/FileTypeIcones/pdf.svg";

interface IFileIcon {
  contentType: string;
}

const FileIcon = ({ contentType }: IFileIcon) => {
  switch (contentType) {
    case "image/jpeg":
      return <img src={JpgIcon} alt="JPG" />;
    case "image/png":
      return <img src={PngIcon} alt="PNG" />;
    case "application/msword":
      return <img src={WordIcon} alt="Word" />;
    case "application/vnd.oasis.opendocument.text":
      return <img src={WordIcon} alt="Word" />;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <img src={WordIcon} alt="Word" />;
    case "application/vnd.ms-excel":
      return <img src={ExcelIcon} alt="Excel" />;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <img src={ExcelIcon} alt="Excel" />;
    case "application/vnd.ms-powerpoint":
      return <img src={PowerPointIcon} alt="PowerPoint" />;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <img src={PowerPointIcon} alt="PowerPoint" />;
    case "application/pdf":
      return <img src={PdfIcon} alt="PDF" />;
    default:
      return <img src={JpgIcon} alt="File" />;
  }
};

export default FileIcon;
