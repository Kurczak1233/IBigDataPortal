import {
  administrationRoute,
  articlesRoute,
  createEduLinkRoute,
} from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const EduLinksContentLogic = () => {
  const navigate = useNavigate();
  const navigateToCreateEduLink = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createEduLinkRoute}`);
  };

  return { navigateToCreateEduLink };
};

export default EduLinksContentLogic;
