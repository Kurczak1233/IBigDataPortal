import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApplicationUser } from "redux/slices/applicationUserSlice";
import { RootState } from "redux/store";

const CommonAdminPanelHeaderLogic = () => {
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const [applicationUser, setApplicationUser] =
    useState<IApplicationUser | null>(appUser);

  const disptach = useDispatch();

  const getUserDetailsAndSaveThoseInRedux = useCallback(async () => {
    const user = await getApplicationUser();
    setApplicationUser(user);
    disptach(updateApplicationUser(user));
  }, [disptach]);

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, [getUserDetailsAndSaveThoseInRedux]);

  return { applicationUser };
};
export default CommonAdminPanelHeaderLogic;
