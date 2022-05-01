import PageLayout from "components/common/CommonPageMenu/CommonPageMenu";
import PostMenuContent from "components/PostsPage/PostMenuContent";

const PostPage = () => {
  return (
    <PageLayout
      menuContent={<PostMenuContent />}
      content={<div>Content</div>}
    />
  );
};
export default PostPage;
