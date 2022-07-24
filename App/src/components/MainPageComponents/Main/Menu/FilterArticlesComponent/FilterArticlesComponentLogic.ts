import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useSimpleFilters } from "hooks/FiltrationLogic/useSimpleFilters";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";

interface IFilterArticlesComponentLogic {
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
}

const FilterArticlesComponentLogic = ({
  setArticles,
  initialArticlesModel,
}: IFilterArticlesComponentLogic) => {
  const {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
  } = useSimpleFilters(setArticles, initialArticlesModel);
  const { isMobile, isTablet, smallerLaptop } = useAppResponsiveness();

  return {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
    isMobile,
    isTablet,
    smallerLaptop,
  };
};

export default FilterArticlesComponentLogic;
