import PostsContent from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsContent/PostsContent";
import BigLoader from "components/common/Loaders/BigLoader";
import PostsPageLogic from "./PostsPageLogic";

const PostPage = () => {
  const { posts } = PostsPageLogic();
  return <>{posts ? <PostsContent posts={posts} /> : <BigLoader />}</>;
};
export default PostPage;
