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
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import {
  removeApplicationUser,
  updateApplicationUser,
} from "redux/slices/applicationUserSlice";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import { RootState } from "redux/store";
import { UserRoles } from "enums/UserRoles";

const UserDetailsComponentLogic = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const accessTokenWasSet = useSelector(
    (state: RootState) => state.accessTokenReducer.accessTokenSet
  );

  const [applicationUser, setApplicationUser] =
    useState<ApplicationUser | null>(appUser);
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
    if (accessTokenWasSet) {
      try {
        let user = await getApplicationUser();
        //First registered (and initialized user)
        if (!user) {
          user = await getApplicationUser();
        }
        setApplicationUser(user);
        dispatch(updateApplicationUser(user));
      } catch {
        return;
      }
    } else {
      dispatch(removeApplicationUser());
      setApplicationUser(null);
    }
    setIsLoading(false);
  }, [dispatch, accessTokenWasSet]);

  const hasAccessToPortal = useMemo(() => {
    return appUser && appUser.userRoleId <= UserRoles.Employee;
  }, [appUser]);

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
    hasAccessToPortal,
  };
};

export default UserDetailsComponentLogic;
