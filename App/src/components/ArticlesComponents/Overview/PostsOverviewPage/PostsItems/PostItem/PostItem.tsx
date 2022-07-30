import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import styles from "./PostItem.module.scss";
import PostItemLogic from "./PostItemLogic";

interface IPostItem {
  post: PostViewModel;
  postsColor: AvailableIntensiveColors;
  interactive?: boolean;
  setPosts?: React.Dispatch<React.SetStateAction<PostViewModel[] | undefined>>;
}

const PostItem = ({
  post,
  postsColor,
  setPosts,
  interactive = true,
}: IPostItem) => {
  const {
    naviateToItemOverview,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteItem,
    openDeleteModal,
    deleteItemButton,
    isTablet,
    isMobile,
  } = PostItemLogic(post, setPosts);
  return (
    <>
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteModalOpen}
        description={"delete this post"}
        handleConfirmAction={handleDeleteItem}
      />
      <div
        className={styles.item}
        style={{
          background: `#${postsColor}`,
          cursor: interactive ? "pointer" : "initial",
        }}
        id={interactive ? `articlePost${postsColor}` : ""}
        onClick={(e) => naviateToItemOverview(post, e)}
      >
        <div className={styles.posted}>
          {format(new Date(post.posted), standarizedFormat)}
        </div>
        <div className={styles.title}>{post.title}</div>
        {!(isTablet || isMobile) && (
          <div className={styles.creator}>
            <span>{post.userEmail}</span>
          </div>
        )}
        <SmallButton
          itemRef={deleteItemButton}
          text={"Delete"}
          width={!(isTablet || isMobile) ? "100px" : "75px"}
          onClick={openDeleteModal}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
    </>
  );
};

export default PostItem;
