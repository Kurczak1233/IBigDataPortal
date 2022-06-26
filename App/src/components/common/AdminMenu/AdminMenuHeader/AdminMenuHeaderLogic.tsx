import { useAuth0 } from "@auth0/auth0-react";
import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApplicationUser } from "redux/slices/applicationUserSlice";
import { RootState } from "redux/store";

const CommonAdminPanelHeaderLogic = () => {
  const { isAuthenticated } = useAuth0();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const [applicationUser, setApplicationUser] =
    useState<IApplicationUser | null>(appUser);

  const disptach = useDispatch();

  const getUserDetailsAndSaveThoseInRedux = useCallback(async () => {
    if (isAuthenticated) {
      const user = await getApplicationUser();
      setApplicationUser(user);
      disptach(updateApplicationUser(user));
    }
  }, [disptach, isAuthenticated]);

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, [getUserDetailsAndSaveThoseInRedux, isAuthenticated]);

  return { applicationUser };
};
export default CommonAdminPanelHeaderLogic;
