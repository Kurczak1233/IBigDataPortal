import {
  administrationRoute,
  articlesRoute,
  createPostRoute,
} from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const NoItemsComponentLogic = () => {
  const navigate = useNavigate();
  const navigateToCreatePosts = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createPostRoute}`);
  };

  return { navigateToCreatePosts };
};
export default NoItemsComponentLogic;
