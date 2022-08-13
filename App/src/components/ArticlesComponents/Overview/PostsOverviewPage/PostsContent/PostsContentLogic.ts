import {
  administrationRoute,
  articlesRoute,
  createPostRoute,
} from "constants/apiRoutes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

const PostsContentLogic = () => {
  const filteredPosts = useSelector(
    (state: RootState) => state.articlesFiltersReducer.postsFiltered
  );
  const [filtersSet, setFiltersSet] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToCreatePosts = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createPostRoute}`);
  };

  return {
    navigateToCreatePosts,
    filteredPosts,
    setFiltersSet,
    filtersSet,
  };
};
export default PostsContentLogic;
