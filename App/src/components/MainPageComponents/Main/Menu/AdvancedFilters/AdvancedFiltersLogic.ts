import { useAdvancedFilters } from "hooks/FiltrationLogic/useAdvancedFilters";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useDispatch, useSelector } from "react-redux";
import { updateResetSimpleFilters } from "redux/slices/resetFiltersFlags";
import { RootState } from "redux/store";

interface IAdvancedFiltersLogic {
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
}

const AdvancedFiltersLogic = ({
  setArticles,
  initialArticlesModel,
}: IAdvancedFiltersLogic) => {
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const dispatch = useDispatch();
  const {
    handleSubmit,
    errors,
    register,
    filterByText,
    handleResetAdvancedFilters,
  } = useAdvancedFilters(setArticles, initialArticlesModel);

  const resetAllFilters = () => {
    handleResetAdvancedFilters();
    dispatch(updateResetSimpleFilters(true));
  };

  return {
    appUser,
    handleSubmit,
    errors,
    register,
    filterByText,
    resetAllFilters,
  };
};

export default AdvancedFiltersLogic;
