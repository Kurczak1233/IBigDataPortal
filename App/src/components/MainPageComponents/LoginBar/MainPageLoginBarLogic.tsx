import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const MainPageLoginBarLogic = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout } = useAuth0();
  const handleClickOnLogin = () => {
    loginWithRedirect();
  };

  const handleClickOnRegister = () => {
    loginWithRedirect({ screen_hint: "signup" });
  };

  const handleLogOut = () => {
    logout();
  };

  const handleMoveToThePortal = () => {
    navigate("/administration");
  };

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
  };
};

export default MainPageLoginBarLogic;
