import { getAllItemsFiles } from "api/FileClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ArticlePageLogic = () => {
  const [articleFiles, setArticleFiles] = useState<FileVm[]>([]);
  const [filesLoading, setFilesLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state as IMergedPosts;
  const [articleComments, setArticleComments] = useState<CommentVm[]>(
    article.comments
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
    return findArticleColour(article.type);
  }, [article]);
  const componentIntensiveColour = useMemo(() => {
    return findIntensiveArticleColour(article.type);
  }, [article]);

  const handleItemFiles = useCallback(async () => {
    const type = findModuleEnum(article.type);
    const reuslt = await getAllItemsFiles(article.id, type);
    await setArticleFiles(reuslt);
    setFilesLoading(false);
  }, [article]);

  const navigateBack = () => {
    navigate("/");
  };

  useEffect(() => {
    handleItemFiles();
  }, [article.id, article.type, handleItemFiles]);

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
