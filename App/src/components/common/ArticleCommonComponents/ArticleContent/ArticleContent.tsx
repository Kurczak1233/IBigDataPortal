import { standarizedFormat } from "constants/dateFormats";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./ArticleContent.module.scss";
import { format } from "date-fns";

interface IArticleContent {
  posts: PostViewModel[];
}

const ArticleContent = ({ posts }: IArticleContent) => {
  return (
    <div>
      {posts.map((post, index) => (
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
  );
};

export default ArticleContent;
