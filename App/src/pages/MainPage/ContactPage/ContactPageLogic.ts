import { useNavigate } from "react-router-dom";

const ContactPageLogic = () => {
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/");
  };
  return { navigateToMainPage };
};
export default ContactPageLogic;
