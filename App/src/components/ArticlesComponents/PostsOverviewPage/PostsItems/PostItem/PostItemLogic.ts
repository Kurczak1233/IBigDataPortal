import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useNavigate } from "react-router-dom";

const PostItemLogic = () => {
  const navigate = useNavigate();
  const naviateToItemOverview = (post: PostViewModel) => {
    navigate(
      `/${administrationRoute}/${articlesRoute}/${postsRoute}/${post.id}`,
      { state: post }
    );
  };

  return {
    naviateToItemOverview,
  };
};

export default PostItemLogic;
