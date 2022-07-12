import { getAllArticles } from "api/ArticlesClient";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useEffect, useState } from "react";

const MainPageLogic = () => {
  const [initialArticlesModel, setOriginalArticlesModel] =
    useState<ArticlesVm>();
  const [articles, setArticles] = useState<ArticlesVm>();
  const [numberOfArticlesVisible, setNumberOfArticlesVisible] =
    useState<number>(8);

  const handleGetAllArticles = async () => {
    const articles = await getAllArticles();
    setArticles(articles);
    setOriginalArticlesModel({ ...articles });
  };

  useEffect(() => {
    handleGetAllArticles();
  }, []);

  return {
    articles,
    setArticles,
    initialArticlesModel,
    numberOfArticlesVisible,
    setNumberOfArticlesVisible,
  };
};

export default MainPageLogic;
