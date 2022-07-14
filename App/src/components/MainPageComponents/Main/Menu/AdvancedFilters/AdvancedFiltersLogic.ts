import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateResetAdvancedFilters,
  updateResetSimpleFilters,
} from "redux/slices/resetFiltersFlags";
import { RootState } from "redux/store";
import { IFilterByText } from "./IAdvancedFiltersForms";

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
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFilterByText>();
  const advancedFiltersShouldReset = useSelector(
    (state: RootState) => state.resetFiltersFlags.resetAdvancedFilters
  );

  const filterPostsByData = (data: string, items: PostViewModel[]) => {
    return items.filter(
      (item) => item.description.includes(data) || item.title.includes(data)
    );
  };

  const filterJobOffersByData = (data: string, items: JobOfferViewModel[]) => {
    return items.filter(
      (item) => item.description.includes(data) || item.title.includes(data)
    );
  };

  const filterEduLinksByData = (data: string, items: EduLinkViewModel[]) => {
    return items.filter(
      (item) => item.description.includes(data) || item.title.includes(data)
    );
  };

  const filterByText = (data: IFilterByText) => {
    if (!initialArticlesModel) {
      return;
    }
    const eduLinks = filterEduLinksByData(
      data.description,
      initialArticlesModel.eduLinks
    );
    const jobOffers = filterJobOffersByData(
      data.description,
      initialArticlesModel.jobOffers
    );
    const posts = filterPostsByData(
      data.description,
      initialArticlesModel.posts
    );
    setArticles({ posts: posts, eduLinks: eduLinks, jobOffers: jobOffers });
    dispatch(updateResetSimpleFilters(true));
  };

  const handleResetAdvancedFilters = useCallback(() => {
    setValue("description", "");
    dispatch(updateResetAdvancedFilters(false));
  }, [dispatch, setValue]);

  useEffect(() => {
    if (advancedFiltersShouldReset) {
      handleResetAdvancedFilters();
    }
  }, [advancedFiltersShouldReset, handleResetAdvancedFilters]);

  return { appUser, handleSubmit, errors, register, filterByText };
};

export default AdvancedFiltersLogic;
