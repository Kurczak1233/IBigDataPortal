import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
import MainPageLoginBar from "../../components/MainPageComponents/LoginBar/MainPageLoginBar";
import MainPageMain from "../../components/MainPageComponents/Main/MainPageMain";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div>
      <MainPageHeader />
      <MainPageLoginBar />
      <MainPageMain />
    </div>
  );
};

export default MainPage;
