import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateResetAdvancedFilters,
  updateResetSimpleFilters,
} from "redux/slices/resetFiltersFlags";
import { RootState } from "redux/store";

export const useSimpleFilters = (
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>,
  initialArticlesModel: ArticlesVm | undefined
) => {
  const [arePostsVisible, setArePostsVisible] = useState<boolean>(true);
  const [areJobOffersVisible, setAreJobOffersVisible] = useState<boolean>(true);
  const [areEduLinksVisible, setAreEduLinksVisible] = useState<boolean>(true);
  const simpleFiltersShouldReset = useSelector(
    (state: RootState) => state.resetFiltersFlags.resetSimpleFilters
  );
  const dispatch = useDispatch();

  const filterByPosts = async () => {
    await dispatch(updateResetAdvancedFilters(true));
    let shouldFilterByPosts = false;
    setArePostsVisible((oldValue) => {
      shouldFilterByPosts = !oldValue;
      return !oldValue;
    });
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (!areJobOffersVisible) {
        oldArticles.jobOffers = [];
      } else {
        oldArticles.jobOffers = initialArticlesModel.jobOffers;
      }
      if (!areEduLinksVisible) {
        oldArticles.eduLinks = [];
      } else {
        oldArticles.eduLinks = initialArticlesModel.eduLinks;
      }
      if (!shouldFilterByPosts) {
        oldArticles.posts = [];
      } else {
        oldArticles.posts = initialArticlesModel.posts;
      }
      return { ...oldArticles };
    });
  };
  const filterByJobOffers = async () => {
    await dispatch(updateResetAdvancedFilters(true));
    let shouldFilterByJobOffers = false;
    setAreJobOffersVisible((oldValue) => {
      shouldFilterByJobOffers = !oldValue;
      return !oldValue;
    });
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (!shouldFilterByJobOffers) {
        oldArticles.jobOffers = [];
      } else {
        oldArticles.jobOffers = initialArticlesModel.jobOffers;
      }
      if (!areEduLinksVisible) {
        oldArticles.eduLinks = [];
      } else {
        oldArticles.eduLinks = initialArticlesModel.eduLinks;
      }
      if (!arePostsVisible) {
        oldArticles.posts = [];
      } else {
        oldArticles.posts = initialArticlesModel.posts;
      }
      return { ...oldArticles };
    });
  };
  const filterByEduLinks = async () => {
    await dispatch(updateResetAdvancedFilters(true));
    let shouldFilterByEduLinks = false;
    await setAreEduLinksVisible((oldValue) => {
      shouldFilterByEduLinks = !oldValue;
      return !oldValue;
    });
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (!areJobOffersVisible) {
        oldArticles.jobOffers = [];
      } else {
        oldArticles.jobOffers = initialArticlesModel.jobOffers;
      }
      if (!shouldFilterByEduLinks) {
        oldArticles.eduLinks = [];
      } else {
        oldArticles.eduLinks = initialArticlesModel.eduLinks;
      }
      if (!arePostsVisible) {
        oldArticles.posts = [];
      } else {
        oldArticles.posts = initialArticlesModel.posts;
      }
      return { ...oldArticles };
    });
  };

  const resetSimpleFilters = useCallback(() => {
    setArePostsVisible(true);
    setAreEduLinksVisible(true);
    setAreJobOffersVisible(true);
    dispatch(updateResetSimpleFilters(false));
  }, [dispatch]);

  useEffect(() => {
    if (simpleFiltersShouldReset) {
      resetSimpleFilters();
    }
  }, [resetSimpleFilters, simpleFiltersShouldReset]);

  return {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
  };
};
