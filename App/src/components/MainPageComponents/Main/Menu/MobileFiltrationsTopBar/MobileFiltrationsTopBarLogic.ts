import { useSimpleFilters } from "hooks/FiltrationLogic/useSimpleFilters";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";

const MobileFiltrationsTopBarLogic = (
  initialArticlesModel: ArticlesVm | undefined,
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>
) => {
  const {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
  } = useSimpleFilters(setArticles, initialArticlesModel);
  const { isTablet } = useAppResponsiveness();

  return {
    arePostsVisible,
    areJobOffersVisible,
    areEduLinksVisible,
    filterByPosts,
    filterByEduLinks,
    filterByJobOffers,
    isTablet,
  };
};

export default MobileFiltrationsTopBarLogic;
