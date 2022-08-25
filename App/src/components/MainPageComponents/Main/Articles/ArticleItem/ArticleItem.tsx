import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { format } from "date-fns";
import { IMergedPosts } from "../ArticlesLogic";
import styles from "./ArticleItem.module.scss";
import ArticleItemLogic from "./ArticleItemLogic";
import parse from "html-react-parser";
import { htmlSubstring } from "utils/HtmlSubstring/HtmlSubstring";

interface IArticleItem {
  article: IMergedPosts;
}

const ArticleItem = ({ article }: IArticleItem) => {
  const { componentColour, componentIntensiveColour, navigateToArticle } =
    ArticleItemLogic(article);
  return (
    <div
      className={styles.article}
      style={{ backgroundColor: `#${componentColour}` }}
    >
      <title className={styles.title}>{article.title}</title>
      <div
        className={styles.subtitle}
        style={{ color: `#${componentIntensiveColour}` }}
      >
        By{" "}
        {article.nickname === "nickname" ? article.userEmail : article.nickname}{" "}
        | On {format(new Date(article.posted), "dd/MMMM/yyyy")}
      </div>
      <SeparationSmallBar
        marginTop={"4px"}
        marginBottom={"8px"}
        color={componentIntensiveColour}
      />
      <div>
        {article.description.length >= 500 ? (
          <span>{parse(htmlSubstring(article.description, 500))}</span>
        ) : (
          parse(article.description)
        )}
      </div>
      <div className={styles.readMoreButton}>
        <SmallButton
          text={"Read more"}
          onClick={navigateToArticle}
          color={componentIntensiveColour}
        />
      </div>
    </div>
  );
};
export default ArticleItem;
