import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import NoItemsComponent from "../../../common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import PostsHeader from "../PostsHeader/PostsHeader";
import PostsItems from "../PostsItems/PostsItems";
import styles from "./PostsContent.module.scss";
import PostsContentLogic from "./PostsContentLogic";
interface IPostsContent {
  posts: PostViewModel[];
}

const PostsContent = ({ posts }: IPostsContent) => {
  const { navigateToCreatePosts } = PostsContentLogic();
  return (
    <>
      {posts.length === 0 ? (
        <NoItemsComponent
          title={"There are no posts"}
          navigateToPage={navigateToCreatePosts}
        />
      ) : (
        <>
          <div className={styles.title}>Overview posts</div>
          <PostsHeader iconsColour={AvailableIntensiveColors.IntensiveOrange} />
          <PostsItems
            posts={posts}
            postsColor={AvailableIntensiveColors.LessIntensiveOrange}
            paginationColor={AvailablePaginationColors.orange}
          />
        </>
      )}
    </>
  );
};
export default PostsContent;
