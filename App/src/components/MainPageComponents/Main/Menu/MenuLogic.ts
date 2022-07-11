import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import application from "authenticationConfig.json";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import {
  removeApplicationUser,
  updateApplicationUser,
} from "redux/slices/applicationUserSlice";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import { RootState } from "redux/store";

const MenuLogic = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const accessTokenWasSet = useSelector(
    (state: RootState) => state.accessTokenReducer.accessTokenSet
  );

  const [applicationUser, setApplicationUser] =
    useState<IApplicationUser | null>(appUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(updateAccessTokenWasSet(false));
  };

  const handleMoveToThePortal = () => {
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

  const getUserDetailsAndSaveThoseInRedux = useCallback(async () => {
    if (accessTokenWasSet) {
      try {
        const user = await getApplicationUser();
        setApplicationUser(user);
        dispatch(updateApplicationUser(user));
      } catch {
        //TODO Redirect to error page.
        return;
      }
    } else {
      dispatch(removeApplicationUser());
      setApplicationUser(null);
    }
    setIsLoading(false);
  }, [dispatch, accessTokenWasSet]);

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, [getUserDetailsAndSaveThoseInRedux, accessTokenWasSet]);

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    applicationUser,
    accessTokenWasSet,
    isLoading,
  };
};

export default MenuLogic;
