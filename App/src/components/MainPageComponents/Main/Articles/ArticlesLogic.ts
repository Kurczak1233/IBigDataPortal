import { compareAsc } from "date-fns";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";

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
}

const ArticlesLogic = () => {
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

  return { sortArticles };
};

export default ArticlesLogic;
