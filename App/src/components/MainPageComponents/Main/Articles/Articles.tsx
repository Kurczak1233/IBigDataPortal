import BigLoader from "components/common/Loaders/BigLoader";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import ArticleItem from "./ArticleItem/ArticleItem";
import styles from "./Articles.module.scss";
import ArticlesLogic from "./ArticlesLogic";

interface IArticles {
  articles: ArticlesVm | undefined;
}

const Articles = ({ articles }: IArticles) => {
  const { sortArticles } = ArticlesLogic();
  return (
    <main className={styles.articlesSite}>
      <div className={styles.headerTitle}>Articles</div>
      {articles ? (
        <main className={styles.mainWrapper}>
          {sortArticles(articles).map((item) => {
            return <ArticleItem key={item.posted.toString()} article={item} />;
          })}
        </main>
      ) : (
        <BigLoader />
      )}
    </main>
  );
};
export default Articles;
