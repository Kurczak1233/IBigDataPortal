import ArticleContent from "components/common/ArticleCommonComponents/ArticleContent/ArticleContent";
import ArticleHeader from "components/common/ArticleCommonComponents/ArticleHeader/ArticleHeader";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import NoItemsComponent from "../../../common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
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
          <ArticleHeader
            iconsColour={AvailableIntensiveColors.IntensiveOrange}
          />
          <ArticleContent
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
