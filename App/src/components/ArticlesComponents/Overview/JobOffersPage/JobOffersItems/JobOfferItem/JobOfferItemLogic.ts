import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useNavigate } from "react-router-dom";

const JobOfferItemLogic = () => {
  const navigate = useNavigate();
  const naviateToItemOverview = (post: JobOfferViewModel) => {
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
