import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
import MainPageLoginBar from "../../components/MainPageComponents/LoginBar/MainPageLoginBar";
import MainPageMain from "../../components/MainPageComponents/Main/MainPageMain";
import MainPageLogic from "./MainPageLogic";

const MainPage = () => {
  MainPageLogic();

  return (
    <>
      <MainPageHeader />
      <MainPageLoginBar />
      <MainPageMain />
    </>
  );
};

export default MainPage;
