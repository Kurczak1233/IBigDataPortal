import { aboutRoute, contactRoute, privacyRoute } from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const MainPageFooterLogic = () => {
  const navigate = useNavigate();
  const navigateToContact = () => {
    navigate(`${contactRoute}`);
  };

  const navigateToAboutUs = () => {
    navigate(`${aboutRoute}`);
  };

  const navigateToPrivacyPolicy = () => {
    navigate(`${privacyRoute}`);
  };
  return { navigateToContact, navigateToAboutUs, navigateToPrivacyPolicy };
};

export default MainPageFooterLogic;
