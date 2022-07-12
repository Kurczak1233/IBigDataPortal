import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
import styles from "./MainPage.module.scss";
import { Outlet } from "react-router-dom";
import MainPageFooter from "components/MainPageComponents/Footer/MainPageFooter";

const MainPage = () => {
  return (
    <div className={styles.pageLayout}>
      <MainPageHeader />
      <Outlet />
      <MainPageFooter />
    </div>
  );
};

export default MainPage;
