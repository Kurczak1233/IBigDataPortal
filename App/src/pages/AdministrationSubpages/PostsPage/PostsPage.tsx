import PageLayout from "components/common/AdminMenu/AdminMenuLayout/AdminMenuLayout";
import PostMenuContent from "components/PostsPage/PostMenuContent/PostMenuContent";
import PostsContent from "components/PostsPage/PostsContent/PostsContent";

const PostPage = () => {
  //TODO render item dynamically (optimalization)?? Make a research.
  return (
    <PageLayout menuContent={<PostMenuContent />} content={<PostsContent />} />
  );
};
export default PostPage;
