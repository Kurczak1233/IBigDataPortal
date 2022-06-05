import EditPost from "components/ArticlesComponents/Edit/EditPost/EditPost";
import PostsHeader from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsHeader/PostsHeader";
import PostItem from "components/ArticlesComponents/Overview/PostsOverviewPage/PostsItems/PostItem/PostItem";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useLocation } from "react-router-dom";
import styles from "./EditPostPage.module.scss";

const EditPostPage = () => {
  const location = useLocation();
  const state = location.state as PostViewModel;
  return (
    <div>
      <div className={styles.title}>Edit post</div>
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
