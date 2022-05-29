import {
  administrationRoute,
  articlesRoute,
  createPostRoute,
} from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const PostsContentLogic = () => {
  const navigate = useNavigate();
  const navigateToCreatePosts = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createPostRoute}`);
  };

  return { navigateToCreatePosts };
};
export default PostsContentLogic;
