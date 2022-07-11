import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
// import MainPageLoginBar from "../../components/MainPageComponents/LoginBar/MainPageLoginBar";
import MainPageMain from "../../components/MainPageComponents/Main/MainPageMain";
import MainPageLogic from "./MainPageLogic";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { articles } = MainPageLogic();
  return (
    <div className={styles.pageLayout}>
      <MainPageHeader />
      {/* <MainPageLoginBar /> */}
      <MainPageMain articles={articles} />
    </div>
  );
};

export default MainPage;
