import { useAuth0 } from "@auth0/auth0-react";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationUser } from "api/UsersClient";
import {
  removeApplicationUser,
  updateApplicationUser,
} from "redux/slices/applicationUserSlice";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import { RootState } from "redux/store";
import { UserRoles } from "enums/UserRoles";

const UserDetailsComponentLogic = () => {
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

export default UserDetailsComponentLogic;
