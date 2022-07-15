import { getAllItemsFiles } from "api/FileClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { ToastModes } from "interfaces/General/ToastModes";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChosenArticle } from "redux/slices/articlesSlice";
import { RootState } from "redux/store";

const ArticlePageLogic = () => {
  const [articleFiles, setArticleFiles] = useState<FileVm[]>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const article = useSelector(
    (state: RootState) => state.articlesReducer.chosenArticle
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

  const findModuleEnum = (type: string): FileModuleEnum => {
    switch (type) {
      case ArticlesTypes.Post:
        return FileModuleEnum.postsFiles;
      case ArticlesTypes.EduLink:
        return FileModuleEnum.eduLinksFiles;
      case ArticlesTypes.JobOffer:
        return FileModuleEnum.jobOffersFiles;
      default:
        return FileModuleEnum.postsFiles;
    }
  };

  const findIntensiveArticleColour = (
    type: string
  ): AvailableIntensiveColors => {
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
  const componentColour = useMemo(() => {
    return findArticleColour(article ? article.type : "");
  }, [article]);
  const componentIntensiveColour = useMemo(() => {
    return findIntensiveArticleColour(article ? article.type : "");
  }, [article]);

  const handleItemFiles = useCallback(async () => {
    if (!article) {
      return SyncToast({
        mode: ToastModes.Info,
        description: "Article was not found",
      });
    }
    const type = findModuleEnum(article.type);
    const reuslt = await getAllItemsFiles(article.id, type);
    await setArticleFiles(reuslt);
    setFilesLoading(false);
  }, [article]);

  const navigateBack = () => {
    dispatch(setChosenArticle(null));
    navigate("/");
  };

  useEffect(() => {
    handleItemFiles();
  }, [article, handleItemFiles]);

  return {
    article,
    articleFiles,
    componentColour,
    componentIntensiveColour,
    navigateBack,
    filesLoading,
    articleComments,
    setArticleComments,
  };
};

export default ArticlePageLogic;
