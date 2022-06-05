import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./PostsItems.module.scss";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import Pagination from "components/common/ArticleCommonComponents/Pagination/Pagination";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import PostsItemsLogic from "./PostsItemsLogic";
import PostItem from "./PostItem/PostItem";

interface IPostsItems {
  posts: PostViewModel[];
  postsColor: AvailableIntensiveColors;
  paginationColor: AvailablePaginationColors;
}

const PostsItems = ({ posts, postsColor, paginationColor }: IPostsItems) => {
  const { handlePageClick, pageCount, currentItems, refContainer } =
    PostsItemsLogic({
      posts,
    });

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content} ref={refContainer}>
        {currentItems.map((post, index) => (
          <PostItem
            key={`${post.title}, ${post.description} ${index}`}
            post={post}
            postsColor={postsColor}
          />
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

export default PostsItems;
