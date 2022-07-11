import MainPageHeader from "../../components/MainPageComponents/Header/MainPageHeader";
import MainPageMain from "../../components/MainPageComponents/Main/MainPageMain";
import MainPageLogic from "./MainPageLogic";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const { articles, setArticles, initialArticlesModel } = MainPageLogic();
  return (
    <div className={styles.pageLayout}>
      <MainPageHeader />
      <MainPageMain
        articles={articles}
        setArticles={setArticles}
        initialArticlesModel={initialArticlesModel}
      />
    </div>
  );
};

export default MainPage;
