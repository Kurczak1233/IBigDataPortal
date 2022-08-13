import { IMergedPosts } from "components/MainPageComponents/Main/Articles/ArticlesLogic";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  filterJobOffers,
  filterEduLinks,
  filterPosts,
} from "redux/slices/articlesFiltersSlice";
import { RootState } from "redux/store";
import { FiltrationLogic } from "./FiltrationLogic/FiltrationLogic";

export interface IFilterArticles {
  from: Date | null;
  to: Date | null;
  title: string;
  creator: string;
}

const ArticlesFilterModalLogic = (
  onCloseModal: () => void,
  articleType: ArticlesTypes,
  setFiltersSet?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isExitHoverActive, setIsExitHoverActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const posts = useSelector(
    (state: RootState) => state.articlesFiltersReducer.posts
  );
  const jobOffers = useSelector(
    (state: RootState) => state.articlesFiltersReducer.jobOffers
  );
  const eduLinks = useSelector(
    (state: RootState) => state.articlesFiltersReducer.eduLinks
  );
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFilterArticles>();

  const resetAndLeave = () => {
    reset({
      from: null,
      to: null,
      title: "",
      creator: "",
    });
    onCloseModal();
  };

  const getDispatchForArticle = useCallback(
    (articleType: ArticlesTypes) => {
      switch (articleType) {
        case ArticlesTypes.Post: {
          return { dispatcher: filterPosts, articles: posts };
        }
        case ArticlesTypes.JobOffer: {
          return {
            dispatcher: filterJobOffers,
            articles: jobOffers,
          };
        }
        case ArticlesTypes.EduLink: {
          return { dispatcher: filterEduLinks, articles: eduLinks };
        }
      }
    },
    [eduLinks, jobOffers, posts]
  );

  const articlesSpecificProperites = useMemo(() => {
    return getDispatchForArticle(articleType);
  }, [articleType, getDispatchForArticle]);

  const filterItems = (data: IFilterArticles) => {
    setFiltersSet && setFiltersSet(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterResult: any = FiltrationLogic(
      data,
      articlesSpecificProperites.articles as unknown as IMergedPosts[]
    );
    dispatch(articlesSpecificProperites.dispatcher(filterResult));
  };

  return {
    isExitHoverActive,
    setIsExitHoverActive,
    register,
    errors,
    control,
    handleSubmit,
    filterItems,
    resetAndLeave,
  };
};

export default ArticlesFilterModalLogic;
