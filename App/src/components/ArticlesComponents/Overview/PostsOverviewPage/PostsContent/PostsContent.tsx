import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import PostsHeader from "../PostsHeader/PostsHeader";
import PostsItems from "../PostsItems/PostsItems";
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
          <AdministartionPageHeader pageTitle={"Overview posts"} />
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
