import Articles from "./Articles/Articles";
import styles from "./MainPageMain.module.scss";
import MainPageMainLogic from "./MainPageMainLogic";
import Menu from "./Menu/Menu";

const MainPageMain = () => {
  const {
    articles,
    setArticles,
    initialArticlesModel,
    numberOfArticlesVisible,
    setNumberOfArticlesVisible,
  } = MainPageMainLogic();
  return (
    <div className={styles.mainPage}>
      <div className={styles.content}>
        <Articles
          articles={articles}
          numberOfArticlesVisible={numberOfArticlesVisible}
          setNumberOfArticlesVisible={setNumberOfArticlesVisible}
        />
        <Menu
          setArticles={setArticles}
          initialArticlesModel={initialArticlesModel}
        />
      </div>
    </div>
  );
};

export default MainPageMain;
