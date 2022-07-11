import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useState } from "react";

interface IFilterArticlesComponentLogic {
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
}

const FilterArticlesComponentLogic = ({
  setArticles,
  initialArticlesModel,
}: IFilterArticlesComponentLogic) => {
  const [arePostsVisible, setArePostsVisible] = useState<boolean>(true);
  const [areJobOffersVisible, setAreJobOffersVisible] = useState<boolean>(true);
  const [areEduLinksVisible, setAreEduLinksVisible] = useState<boolean>(true);

  const filterByPosts = () => {
    setArePostsVisible((oldValue) => !oldValue);
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (arePostsVisible) {
        oldArticles.posts = [];
      } else {
        oldArticles.posts = initialArticlesModel.posts;
      }
      return { ...oldArticles };
    });
  };
  const filterByJobOffers = () => {
    setAreJobOffersVisible((oldValue) => !oldValue);
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (areJobOffersVisible) {
        oldArticles.jobOffers = [];
      } else {
        oldArticles.jobOffers = initialArticlesModel.jobOffers;
      }
      return { ...oldArticles };
    });
  };
  const filterByEduLinks = () => {
    setAreEduLinksVisible((oldValue) => !oldValue);
    setArticles((oldArticles) => {
      if (!initialArticlesModel || !oldArticles) {
        return oldArticles;
      }
      if (areEduLinksVisible) {
        oldArticles.eduLinks = [];
      } else {
        oldArticles.eduLinks = initialArticlesModel.eduLinks;
      }
      return { ...oldArticles };
    });
  };

  return {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
  };
};

export default FilterArticlesComponentLogic;
