import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChosenArticle } from "redux/slices/articlesSlice";
import { RootState } from "redux/store";
import DownloadIcon from "public/DownloadIcons/DownloadIcon.svg";
import GreenDownloadIcon from "public/DownloadIcons/GreenDownloadIcon.svg";
import BlueDownloadIcon from "public/DownloadIcons/BlueDownloadIcon.svg";
import OrangeDownloadIcon from "public/DownloadIcons/OrangeDownloadIcon.svg";
import { getFile } from "api/FileClient";

const ArticlePageLogic = () => {
  const article = useSelector(
    (state: RootState) => state.articlesReducer.chosenArticle
  );
  const articleFiles = useMemo(() => {
    return article
      ? article.files.filter(
          (item) =>
            item.fileType === "image/jpeg" || item.fileType === "image/png"
        )
      : [];
  }, [article]);
  const articleDocuments = useMemo(() => {
    return article
      ? article?.files.filter(
          (item) =>
            item.fileType !== "image/jpeg" && item.fileType !== "image/png"
        )
      : [];
  }, [article]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );

  const [articleComments, setArticleComments] = useState<CommentVm[]>(
    article ? article.comments : []
  );

  const findArticleColour = (type: string): AvailableIntensiveColors => {
    switch (type) {
      case ArticlesTypes.Post:
        return AvailableIntensiveColors.LessIntensiveOrange;
      case ArticlesTypes.EduLink:
        return AvailableIntensiveColors.LessIntensiveGreen;
      case ArticlesTypes.JobOffer:
        return AvailableIntensiveColors.LessIntensiveBlue;
      default:
        return AvailableIntensiveColors.LessIntensiveOrange;
    }
  };

  const findDownloadIcon = (type: string): string => {
    switch (type) {
      case ArticlesTypes.Post:
        return OrangeDownloadIcon;
      case ArticlesTypes.EduLink:
        return GreenDownloadIcon;
      case ArticlesTypes.JobOffer:
        return BlueDownloadIcon;
      default:
        return DownloadIcon;
    }
  };

  const findIntensiveArticleColour = (type: string) => {
    switch (type) {
      case ArticlesTypes.Post:
        return AvailableIntensiveColors.IntensiveOrange;
      case ArticlesTypes.EduLink:
        return AvailableIntensiveColors.IntensiveGreen;
      case ArticlesTypes.JobOffer:
        return AvailableIntensiveColors.IntensiveBlue;
      default:
        return AvailableIntensiveColors.IntensiveOrange;
    }
  };

  const navigateBack = () => {
    dispatch(setChosenArticle(null));
    navigate("/");
  };

  const downloadFile = async (file: FileVm) => {
    const downloadedFile = await getFile(file.guid);
    const blob = b64toBlob(
      downloadedFile.base64FileString,
      downloadedFile.fileType
    );
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = downloadedFile.fileName;
    link.click();
  };

  const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const componentColour = useMemo(() => {
    return findArticleColour(article ? article.type : "");
  }, [article]);
  const componentIntensiveColour = useMemo(() => {
    return findIntensiveArticleColour(article ? article.type : "");
  }, [article]);
  const downloadIconOnHover = useMemo(() => {
    return findDownloadIcon(article ? article.type : "");
  }, [article]);

  return {
    article,
    articleFiles,
    componentColour,
    componentIntensiveColour,
    downloadIconOnHover,
    navigateBack,
    downloadFile,
    appUser,
    articleComments,
    articleDocuments,
    setArticleComments,
  };
};

export default ArticlePageLogic;
