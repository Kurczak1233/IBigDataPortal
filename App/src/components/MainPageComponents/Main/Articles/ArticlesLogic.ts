import { compareAsc } from "date-fns";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { CommentVm } from "interfaces/Models/Comments/CommentVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateArticles } from "redux/slices/articlesSlice";

export interface IMergedPosts {
  title: string;
  link?: string;
  id: number;
  description: string;
  posted: Date;
  userEmail: string;
  files: FileVm[];
  type: string;
  nickname: string;
  comments: CommentVm[];
  prohibitedCommenting: boolean;
}

const ArticlesLogic = (
  setNumberOfArticlesVisible: React.Dispatch<React.SetStateAction<number>>,
  articles: ArticlesVm | undefined
) => {
  const dispatch = useDispatch();
  const sortArticles = (articles: ArticlesVm | undefined): IMergedPosts[] => {
    if (articles) {
      const oneArray = [
        ...articles.eduLinks,
        ...articles.jobOffers,
        ...articles.posts,
      ];
      oneArray.sort((item, secondItem) =>
        compareAsc(new Date(secondItem.posted), new Date(item.posted))
      );
      return oneArray;
    }
    return [];
  };

  const sortedArticles = useMemo(() => {
    const sortedArticles = sortArticles(articles);
    dispatch(updateArticles(sortedArticles));
    return sortedArticles;
  }, [articles, dispatch]);

  const multiplyNumbersOfArticles = () => {
    setNumberOfArticlesVisible((oldValue) => oldValue + 8);
  };

  return { sortedArticles, multiplyNumbersOfArticles };
};

export default ArticlesLogic;
