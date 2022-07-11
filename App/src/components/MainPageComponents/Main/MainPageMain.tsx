import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import Articles from "./Articles/Articles";
import styles from "./MainPageMain.module.scss";
import Menu from "./Menu/Menu";

interface IMainPageMain {
  articles: ArticlesVm | undefined;
}

const MainPageMain = ({ articles }: IMainPageMain) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.content}>
        <Articles articles={articles} />
        <Menu />
      </div>
    </div>
  );
};

export default MainPageMain;
