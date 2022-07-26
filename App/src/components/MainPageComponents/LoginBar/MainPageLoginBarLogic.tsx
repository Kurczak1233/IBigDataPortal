import { useAuth0 } from "@auth0/auth0-react";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useNavigate } from "react-router-dom";

const MainPageLoginBarLogic = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user } = useAuth0();
  const baseUrl = useBaseUrl();
  const handleClickOnLogin = () => {
    loginWithRedirect();
  };

  const handleClickOnRegister = () => {
    loginWithRedirect({ screen_hint: "signup" });
  };

  const handleLogOut = () => {
    logout({ returnTo: baseUrl });
  };

  const handleMoveToThePortal = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
  };

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    user,
  };
};

export default MainPageLoginBarLogic;
