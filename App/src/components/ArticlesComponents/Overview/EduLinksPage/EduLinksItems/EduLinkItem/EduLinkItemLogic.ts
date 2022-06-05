import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useNavigate } from "react-router-dom";

const EduLinkItemLogic = () => {
  const navigate = useNavigate();
  const naviateToItemOverview = (eduLink: EduLinkViewModel) => {
    navigate(
      `/${administrationRoute}/${articlesRoute}/${eduLinksRoute}/${eduLink.id}`,
      { state: eduLink }
    );
  };

  return {
    naviateToItemOverview,
  };
};

export default EduLinkItemLogic;
