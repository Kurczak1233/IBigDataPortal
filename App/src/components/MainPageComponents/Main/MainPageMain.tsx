import BigLoader from "components/common/Loaders/BigLoader";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import styles from "./MainPageMain.module.scss";
import Menu from "./Menu/Menu";

interface IMainPageMain {
  articles: ArticlesVm | undefined;
}

const MainPageMain = ({ articles }: IMainPageMain) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.content}>
        <main className={styles.articlesSite}>
          <div className={styles.headerTitle}>Articles</div>
          {articles ? <main>Some data here</main> : <BigLoader />}
        </main>
        <Menu />
      </div>
    </div>
  );
};

export default MainPageMain;
