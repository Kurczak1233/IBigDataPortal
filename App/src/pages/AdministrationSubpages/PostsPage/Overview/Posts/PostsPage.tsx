import PostsContent from "components/PostsOverviewPage/PostsContent/PostsContent";
import PostsPageLogic from "./PostsPageLogic";

const PostPage = () => {
  const { posts } = PostsPageLogic();
  return <>{posts ? <PostsContent posts={posts} /> : <div />}</>;
};
export default PostPage;
