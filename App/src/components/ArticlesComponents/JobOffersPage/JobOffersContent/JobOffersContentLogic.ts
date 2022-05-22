import {
  administrationRoute,
  articlesRoute,
  createJobOfferRoute,
} from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const JobOfferContentLogic = () => {
  const navigate = useNavigate();
  const navigateToCreateJobOffer = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createJobOfferRoute}`);
  };

  return { navigateToCreateJobOffer };
};
export default JobOfferContentLogic;
