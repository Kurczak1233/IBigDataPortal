import { useAuth0 } from "@auth0/auth0-react";
import { getApplicationUser } from "api/UsersClient";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import {
  updateApplicationUser,
  removeApplicationUser,
} from "redux/slices/applicationUserSlice";
import { calculateCooperationsLenght } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

export const useLoginFlow = () => {
  const [wasLoaded, setWasLoaded] = useState<boolean>(false);
  const { isLoading, user } = useAuth0();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const accessTokenWasSet = useSelector(
    (state: RootState) => state.accessTokenReducer.accessTokenSet
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginWithRedirect, logout } = useAuth0();
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
    dispatch(calculateCooperationsLenght());
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
  };

  const getUserDetailsAndSaveThoseInRedux = useCallback(async () => {
    if (accessTokenWasSet && user) {
      try {
        let user = await getApplicationUser();
        //First registered (and initialized user)
        if (!user) {
          user = await getApplicationUser();
        }
        dispatch(updateApplicationUser(user));
        setWasLoaded(true);
      } catch {
        return;
      }
    } else if (user === undefined) {
      dispatch(removeApplicationUser());
      setWasLoaded(true);
    }
  }, [accessTokenWasSet, user, dispatch]);

  const hasAccessToPortal = useMemo(() => {
    return appUser && appUser.userRoleId <= UserRoles.Employee;
  }, [appUser]);

  useEffect(() => {
    if (!isLoading) {
      getUserDetailsAndSaveThoseInRedux();
    }
  }, [getUserDetailsAndSaveThoseInRedux, accessTokenWasSet, isLoading]);

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    wasLoaded,
    hasAccessToPortal,
  };
};
