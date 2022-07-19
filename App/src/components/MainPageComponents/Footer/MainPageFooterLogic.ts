import { aboutRoute, contactRoute, privacyRoute } from "constants/apiRoutes";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useNavigate } from "react-router-dom";

const MainPageFooterLogic = () => {
  const navigate = useNavigate();
  const { isMobile } = useAppResponsiveness();
  const navigateToContact = () => {
    navigate(`${contactRoute}`);
  };

  const navigateToAboutUs = () => {
    navigate(`${aboutRoute}`);
  };

  const navigateToPrivacyPolicy = () => {
    navigate(`${privacyRoute}`);
  };
  return {
    navigateToContact,
    navigateToAboutUs,
    navigateToPrivacyPolicy,
    isMobile,
  };
};

export default MainPageFooterLogic;
