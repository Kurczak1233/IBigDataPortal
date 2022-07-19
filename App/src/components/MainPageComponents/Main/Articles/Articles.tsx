import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";
import ArticleItem from "./ArticleItem/ArticleItem";
import styles from "./Articles.module.scss";
import ArticlesLogic from "./ArticlesLogic";
import GreenFeatherIcon from "public/PostsIcons/GreenFeatherIcon.svg";
import BigButton from "components/common/Buttons/BigButtons/BigButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";

interface IArticles {
  articles: ArticlesVm | undefined;
  numberOfArticlesVisible: number;
  setNumberOfArticlesVisible: React.Dispatch<React.SetStateAction<number>>;
}

const Articles = ({
  articles,
  numberOfArticlesVisible,
  setNumberOfArticlesVisible,
}: IArticles) => {
  const { sortedArticles, multiplyNumbersOfArticles, isMobile, isTablet } =
    ArticlesLogic(setNumberOfArticlesVisible, articles);
  return (
    <main className={styles.articlesSite}>
      {!(isMobile || isTablet) && (
        <div className={styles.headerTitle}>Articles</div>
      )}
      {articles ? (
        <>
          <main className={styles.mainWrapper}>
            {sortedArticles.length > 0 ? (
              sortedArticles.slice(0, numberOfArticlesVisible).map((item) => {
                return (
                  <ArticleItem key={item.posted.toString()} article={item} />
                );
              })
            ) : (
              <div className={styles.noArticlesComponent}>
                There are no articles here
                <div>
                  <img
                    width={40}
                    height={40}
                    src={GreenFeatherIcon}
                    alt={"Article icon"}
                  />
                </div>
              </div>
            )}
          </main>
          {sortedArticles.length > numberOfArticlesVisible && (
            <div className={styles.showMoreArticles}>
              <BigButton
                text={"Load more..."}
                color={AvailableIntensiveColors.IntensiveGreen}
                onClick={multiplyNumbersOfArticles}
              />
            </div>
          )}
        </>
      ) : (
        <BigLoader />
      )}
    </main>
  );
};
export default Articles;
