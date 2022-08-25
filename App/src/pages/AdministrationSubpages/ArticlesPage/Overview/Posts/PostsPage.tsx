import PostsContent from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsContent/PostsContent";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
import PostsPageLogic from "./PostsPageLogic";

const PostPage = () => {
  const { posts, setPosts } = PostsPageLogic();
  return (
    <>
      {posts ? (
        <PostsContent posts={posts} setPosts={setPosts} />
      ) : (
        <BigLoader />
      )}
    </>
  );
};
export default PostPage;
