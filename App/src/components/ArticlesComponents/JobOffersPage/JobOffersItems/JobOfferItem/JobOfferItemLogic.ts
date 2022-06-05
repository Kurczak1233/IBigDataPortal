import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useNavigate } from "react-router-dom";

const JobOfferItemLogic = () => {
  const navigate = useNavigate();
  const naviateToItemOverview = (post: PostViewModel) => {
    navigate(
      `/${administrationRoute}/${articlesRoute}/${jobOffersRoute}/${post.id}`,
      { state: post }
    );
  };

  return {
    naviateToItemOverview,
  };
};

export default JobOfferItemLogic;
