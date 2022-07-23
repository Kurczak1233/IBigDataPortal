import { IFilterByText } from "components/MainPageComponents/Main/Menu/AdvancedFilters/IAdvancedFiltersForms";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  updateResetSimpleFilters,
  updateResetAdvancedFilters,
} from "redux/slices/resetFiltersFlags";
import { RootState } from "redux/store";

export const useAdvancedFilters = (
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>,
  initialArticlesModel: ArticlesVm | undefined
) => {
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
    setArticles(initialArticlesModel);
  }, [dispatch, initialArticlesModel, setArticles, setValue]);

  useEffect(() => {
    if (advancedFiltersShouldReset) {
      handleResetAdvancedFilters();
    }
  }, [advancedFiltersShouldReset, handleResetAdvancedFilters]);

  return {
    handleSubmit,
    errors,
    register,
    filterByText,
    handleResetAdvancedFilters,
  };
};
