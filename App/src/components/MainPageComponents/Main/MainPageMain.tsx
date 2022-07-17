import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
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
    articlesLoaded,
  } = MainPageMainLogic();
  if (!articlesLoaded) {
    return <BigLoader />;
  }
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
