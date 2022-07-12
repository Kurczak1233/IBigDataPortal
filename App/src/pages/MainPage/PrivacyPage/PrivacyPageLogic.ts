import { useNavigate } from "react-router-dom";

const PrivacyPageLogic = () => {
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/");
  };
  return { navigateToMainPage };
};
export default PrivacyPageLogic;
