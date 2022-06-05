import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./PostItem.module.scss";
import PostItemLogic from "./PostItemLogic";

interface IPostItem {
  post: PostViewModel;
  postsColor: AvailableIntensiveColors;
}

const PostItem = ({ post, postsColor }: IPostItem) => {
  const { naviateToItemOverview } = PostItemLogic();
  return (
    <div
      className={styles.item}
      style={{ background: `#${postsColor}` }}
      id={`articlePost${postsColor}`}
      onClick={() => naviateToItemOverview(post)}
    >
      <div className={styles.posted}>
        {format(new Date(post.posted), standarizedFormat)}
      </div>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.creator}>{post.userEmail}</div>
    </div>
  );
};

export default PostItem;
