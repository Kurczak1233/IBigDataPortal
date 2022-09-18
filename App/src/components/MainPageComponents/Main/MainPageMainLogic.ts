import { useAuth0 } from "@auth0/auth0-react";
import { getAllArticles } from "api/ArticlesClient";
import { getApplicationUser } from "api/UsersClient";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateApplicationUser,
  removeApplicationUser,
} from "redux/slices/applicationUserSlice";
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
  const dispatch = useDispatch();
  const { isLoading, user } = useAuth0();

  const getUserDetailsAndSaveThoseInRedux = useCallback(async () => {
    if (accessTokenWasSet && user) {
      try {
        let user = await getApplicationUser();
        //First registered (and initialized user)
        if (!user) {
          user = await getApplicationUser();
        }
        dispatch(updateApplicationUser(user));
      } catch {
        return;
      }
    } else if (user === undefined) {
      dispatch(removeApplicationUser());
    }
  }, [accessTokenWasSet, user, dispatch]);

  const handleGetAllArticles = useCallback(async () => {
    if ((accessTokenWasSet && user) || user === undefined) {
      const allArticles = await getAllArticles();
      setArticles({ ...allArticles });
      setOriginalArticlesModel({ ...allArticles });
      setArticlesLoaded(true);
    }
  }, [accessTokenWasSet, user]);

  const handleGetUserDetails = useCallback(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, [getUserDetailsAndSaveThoseInRedux]);

  useEffect(() => {
    handleGetAllArticles();
  }, [handleGetAllArticles]);

  useEffect(() => {
    if (!isLoading) {
      handleGetUserDetails();
    }
  }, [handleGetUserDetails, isLoading, accessTokenWasSet, user]);

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
