/* eslint-disable @typescript-eslint/no-unused-vars */
import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/IApplicationUser";
import { useEffect, useState } from "react";
import styles from "./CommonAdminPanelHeader.module.scss";

const CommonAdminPanelHeaderLogic = () => {
  const [applicationUser, setApplicationUser] =
    useState<IApplicationUser | null>(null);
  const [success, setSuccess] = useState<string>("");
  const getUserDetailsAndSaveThoseInRedux = async () => {
    setSuccess(await getApplicationUser());
  };

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, []);

  return { applicationUser, success };
};
export default CommonAdminPanelHeaderLogic;
