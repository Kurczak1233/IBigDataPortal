import ArticleContent from "components/common/ArticleCommonComponents/ArticleContent/ArticleContent";
import ArticleHeader from "components/common/ArticleCommonComponents/ArticleHeader/ArticleHeader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import NoItemsComponent from "../NoItemsComponent/NoItemsComponent";
import styles from "./PostsContent.module.scss";
interface IPostsContent {
  posts: PostViewModel[];
}

const PostsContent = ({ posts }: IPostsContent) => {
  return (
    <>
      {posts.length === 0 ? (
        <NoItemsComponent title={"There are no posts"} />
      ) : (
        <>
          <div className={styles.title}>Overview posts</div>
          <ArticleHeader
            iconsColour={AvailableIntensiveColors.IntensiveOrange}
          />
          <ArticleContent posts={posts} />
        </>
      )}
    </>
  );
};
export default PostsContent;
