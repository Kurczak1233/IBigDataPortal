import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
import styles from "./MainPage.module.scss";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className={styles.pageLayout}>
      <MainPageHeader />
      <Outlet />
    </div>
  );
};

export default MainPage;
