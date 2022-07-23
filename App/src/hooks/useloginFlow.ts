import { useAuth0 } from "@auth0/auth0-react";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import { calculateCooperationsLenght } from "redux/slices/cooperationsSlice";
import { RootState } from "redux/store";

export const useLoginFlow = () => {
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

  const hasAccessToPortal = useMemo(() => {
    return appUser && appUser.userRoleId <= UserRoles.Employee;
  }, [appUser]);

  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    hasAccessToPortal,
  };
};
