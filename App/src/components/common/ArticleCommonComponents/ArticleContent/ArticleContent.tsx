import { standarizedFormat } from "constants/dateFormats";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./ArticleContent.module.scss";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import ArticleContentLogic from "./ArticleContentLogic";

interface IArticleContent {
  posts: PostViewModel[];
}

const ArticleContent = ({ posts }: IArticleContent) => {
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
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(event) => handlePageClick(event)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
        />
      </div>
    </div>
  );
};

export default ArticleContent;
