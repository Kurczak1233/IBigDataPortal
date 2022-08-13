import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { isAfter, isBefore } from "date-fns";
import { IFilterArticles } from "../ArticlesFilterModalLogic";

export const FiltrationLogic = (
  data: IFilterArticles,
  articles: IMergedPosts[]
) => {
  let filterResult = [...articles];
  if (data.from) {
    filterResult = filterFromData(data.from, filterResult);
  }
  if (data.to) {
    filterResult = filterToData(data.to, filterResult);
  }
  if (data.title) {
    filterResult = filterByTitle(data.title, filterResult);
  }
  if (data.creator) {
    filterResult = filterByCreator(data.creator, filterResult);
  }
  return filterResult;
};

const filterFromData = (from: Date, articles: IMergedPosts[]) => {
  return articles.filter((item) => isAfter(new Date(item.posted), from));
};

const filterToData = (to: Date, articles: IMergedPosts[]) => {
  return articles.filter((item) => isBefore(new Date(item.posted), to));
};

const filterByTitle = (title: string, articles: IMergedPosts[]) => {
  return articles.filter((item) =>
    item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
  );
};

const filterByCreator = (userEmail: string, articles: IMergedPosts[]) => {
  return articles.filter((item) =>
    item.userEmail.toLocaleLowerCase().includes(userEmail.toLocaleLowerCase())
  );
};
