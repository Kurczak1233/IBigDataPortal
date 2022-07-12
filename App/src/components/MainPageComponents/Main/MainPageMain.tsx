import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import Articles from "./Articles/Articles";
import styles from "./MainPageMain.module.scss";
import Menu from "./Menu/Menu";

interface IMainPageMain {
  articles: ArticlesVm | undefined;
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
}

const MainPageMain = ({
  initialArticlesModel,
  articles,
  setArticles,
}: IMainPageMain) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.content}>
        <Articles articles={articles} />
        <Menu
          setArticles={setArticles}
          initialArticlesModel={initialArticlesModel}
        />
      </div>
    </div>
  );
};

export default MainPageMain;
