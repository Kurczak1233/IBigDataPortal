import { useAuth0 } from "@auth0/auth0-react";
import { getAllArticles } from "api/ArticlesClient";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const MainPageLogic = () => {
  const [initialArticlesModel, setOriginalArticlesModel] =
    useState<ArticlesVm>();
  const [articlesLoaded, setArticlesLoaded] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticlesVm>();
  const [numberOfArticlesVisible, setNumberOfArticlesVisible] =
    useState<number>(8);
  const accessTokenWasSet = useSelector(
    (state: RootState) => state.accessTokenReducer.accessTokenSet
  );
  const { isMobile, isTablet } = useAppResponsiveness();

  const { isLoading, user } = useAuth0();

  const handleGetAllArticles = useCallback(async () => {
    if ((accessTokenWasSet && user) || user === undefined) {
      const articles = await getAllArticles();
      setArticles(articles);
      setOriginalArticlesModel({ ...articles });
      setArticlesLoaded(true);
    }
  }, [accessTokenWasSet, user]);

  useEffect(() => {
    if (!isLoading) {
      handleGetAllArticles();
    }
  }, [handleGetAllArticles, isLoading, accessTokenWasSet, user]);

  return {
    articles,
    setArticles,
    initialArticlesModel,
    numberOfArticlesVisible,
    setNumberOfArticlesVisible,
    articlesLoaded,
    user,
    isMobile,
    isTablet,
  };
};

export default MainPageLogic;
