import { useEffect } from "react";
import styles from "./CommonAdminPanelHeader.module.scss";

const CommonAdminPanelHeaderLogic = () => {
  const getUserDetailsAndSaveThoseInRedux = () => {};

  useEffect(() => {
    getUserDetailsAndSaveThoseInRedux();
  }, []);

  return getUserDetailsAndSaveThoseInRedux;
};
export default CommonAdminPanelHeaderLogic;
