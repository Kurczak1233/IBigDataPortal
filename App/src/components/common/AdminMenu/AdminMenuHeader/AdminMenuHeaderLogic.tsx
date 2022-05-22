import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useEffect, useState } from "react";

const CommonAdminPanelHeaderLogic = () => {
  const [applicationUser, setApplicationUser] =
    useState<IApplicationUser | null>(null);
  const getUserDetailsAndSaveThoseInRedux = async () => {
    setApplicationUser(await getApplicationUser());
  };

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, []);

  return { applicationUser };
};
export default CommonAdminPanelHeaderLogic;
