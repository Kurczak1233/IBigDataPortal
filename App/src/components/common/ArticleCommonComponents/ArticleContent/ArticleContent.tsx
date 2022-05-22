import { standarizedFormat } from "constants/dateFormats";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./ArticleContent.module.scss";
import { format } from "date-fns";
import ArticleContentLogic from "./ArticleContentLogic";
import Pagination from "../Pagination/Pagination";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { AvailablePaginationColors } from "../Pagination/AvailablePaginationColors";

interface IArticleContent {
  posts: PostViewModel[];
  postsColor: AvailableIntensiveColors;
  paginationColor: AvailablePaginationColors;
}

const ArticleContent = ({
  posts,
  postsColor,
  paginationColor,
}: IArticleContent) => {
  const { handlePageClick, pageCount, currentItems, refContainer } =
    ArticleContentLogic({
      posts,
    });

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content} ref={refContainer}>
        {currentItems.map((post, index) => (
          <div
            className={styles.item}
            style={{ background: `#${postsColor}` }}
            id={`articlePost${postsColor}`}
            key={`${post.title}, ${post.description} ${index}`}
          >
            <div className={styles.posted}>
              {format(new Date(post.posted), standarizedFormat)}
            </div>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.creator}>{post.userEmail}</div>
          </div>
        ))}
      </div>
      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        colorName={paginationColor}
      />
    </div>
  );
};

export default ArticleContent;
