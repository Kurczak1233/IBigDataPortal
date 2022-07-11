import { getAllArticles } from "api/ArticlesClient";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useEffect, useState } from "react";

const MainPageLogic = () => {
  const [articles, setArticles] = useState<ArticlesVm>();

  const handleGetAllArticles = async () => {
    setArticles(await getAllArticles());
  };
  useEffect(() => {
    handleGetAllArticles();
  }, []);

  return { articles };
};

export default MainPageLogic;
