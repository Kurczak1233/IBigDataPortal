import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
import Articles from "./Articles/Articles";
import styles from "./MainPageMain.module.scss";
import MainPageMainLogic from "./MainPageMainLogic";
import Menu from "./Menu/Menu";
import MobileFiltrationsTopBar from "./Menu/MobileFiltrationsTopBar/MobileFiltrationsTopBar";

const MainPageMain = () => {
  const {
    articles,
    setArticles,
    initialArticlesModel,
    numberOfArticlesVisible,
    setNumberOfArticlesVisible,
    articlesLoaded,
    user,
    isMobile,
    isTablet,
  } = MainPageMainLogic();

  if (!articlesLoaded) {
    return <BigLoader />;
  }
  return (
    <div className={styles.mainPage}>
      {(isTablet || isMobile) && (
        <MobileFiltrationsTopBar
          user={user}
          setArticles={setArticles}
          initialArticlesModel={initialArticlesModel}
        />
      )}
      <div className={styles.content}>
        <Articles
          articles={articles}
          numberOfArticlesVisible={numberOfArticlesVisible}
          setNumberOfArticlesVisible={setNumberOfArticlesVisible}
        />
        {!(isTablet || isMobile) && (
          <Menu
            user={user}
            setArticles={setArticles}
            initialArticlesModel={initialArticlesModel}
          />
        )}
      </div>
    </div>
  );
};

export default MainPageMain;
