import { useAuth0 } from "@auth0/auth0-react";
import { initialUserCall } from "api/UsersClient";
import axios from "axios";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import application from "../../../authenticationConfig.json";

const MainPageLoginBarLogic = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, getAccessTokenSilently } =
    useAuth0();
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
    initialUserCall();
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
  };

  const runInitialMiddleware = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    const base = application.baseUrl;
    await axios({
      method: "GET",
      url: `${base}/Users/Initial`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (user) {
      runInitialMiddleware();
    }
  }, [runInitialMiddleware, user]);

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    user,
  };
};

export default MainPageLoginBarLogic;
