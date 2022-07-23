import { useAdvancedFilters } from "hooks/FiltrationLogic/useAdvancedFilters";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { useSelector } from "react-redux";
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
  const { handleSubmit, errors, register, filterByText } = useAdvancedFilters(
    setArticles,
    initialArticlesModel
  );
  return { appUser, handleSubmit, errors, register, filterByText };
};

export default AdvancedFiltersLogic;
