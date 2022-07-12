import { useNavigate } from "react-router-dom";

const AboutPageLogic = () => {
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/");
  };
  return { navigateToMainPage };
};
export default AboutPageLogic;
