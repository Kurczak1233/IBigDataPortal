import BigButton from "components/common/Buttons/BigButtons/BigButton";
import BigLoader from "components/common/Loaders/BigLoader";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { format } from "date-fns";
import styles from "./ArticlePage.module.scss";
import ArticlePageLogic from "./ArticlePageLogic";

const ArticlePage = () => {
  const {
    article,
    articleFiles,
    componentColour,
    componentIntensiveColour,
    navigateBack,
    filesLoading,
  } = ArticlePageLogic();
  return (
    <div className={styles.articlePage}>
      <div className={styles.mainContainer}>
        <div
          className={styles.article}
          style={{ backgroundColor: `#${componentColour}` }}
        >
          <title className={styles.title}>{article.title}</title>
          <div
            className={styles.subtitle}
            style={{ color: `#${componentIntensiveColour}` }}
          >
            By {article.nickname} | On{" "}
            {format(new Date(article.posted), "dd/MMMM/yyyy")}
          </div>
          <SeparationSmallBar
            marginTop={"4px"}
            marginBottom={"8px"}
            color={componentIntensiveColour}
          />
          <div>{article.description}</div>
          {filesLoading ? (
            <BigLoader />
          ) : (
            <div className={styles.imageContainer}>
              {articleFiles &&
                articleFiles.map((item) => {
                  return (
                    <img
                      key={item.guid}
                      src={`data:image/png;base64,${item.base64FileString}`}
                      alt={"User item"}
                    />
                  );
                })}
            </div>
          )}
        </div>
        <div className={styles.returnButton}>
          <BigButton
            text={"Return"}
            color={componentIntensiveColour}
            onClick={navigateBack}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
