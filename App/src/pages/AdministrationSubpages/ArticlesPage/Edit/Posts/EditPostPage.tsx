import EditPost from "components/ArticlesComponents/Edit/EditPost/EditPost";
import PostsHeader from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsHeader/PostsHeader";
import PostItem from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsItems/PostItem/PostItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useLocation } from "react-router-dom";

const EditPostPage = () => {
  const location = useLocation();
  const state = location.state as PostViewModel;
  return (
    <div>
      <AdministartionPageHeader pageTitle={"Edit post"} />
      <PostsHeader iconsColour={AvailableIntensiveColors.IntensiveOrange} />
      <PostItem
        post={state}
        postsColor={AvailableIntensiveColors.LessIntensiveOrange}
        interactive={false}
      />
      <EditPost post={state} />
    </div>
  );
};

export default EditPostPage;
