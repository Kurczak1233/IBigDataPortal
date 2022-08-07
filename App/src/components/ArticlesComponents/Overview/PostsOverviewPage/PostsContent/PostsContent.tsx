import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import PostsHeader from "../PostsHeader/PostsHeader";
import PostsItems from "../PostsItems/PostsItems";
import PostsContentLogic from "./PostsContentLogic";
interface IPostsContent {
  posts: PostViewModel[];
  setPosts: React.Dispatch<React.SetStateAction<PostViewModel[] | undefined>>;
}

const PostsContent = ({ posts, setPosts }: IPostsContent) => {
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
          <AdministartionPageHeader
            pageTitle={"Overview posts"}
            showFilterComponent
            articleType={ArticlesTypes.Post}
          />
          <PostsHeader iconsColour={AvailableIntensiveColors.IntensiveOrange} />
          <PostsItems
            posts={posts}
            setPosts={setPosts}
            postsColor={AvailableIntensiveColors.LessIntensiveOrange}
            paginationColor={AvailablePaginationColors.orange}
          />
        </>
      )}
    </>
  );
};
export default PostsContent;
