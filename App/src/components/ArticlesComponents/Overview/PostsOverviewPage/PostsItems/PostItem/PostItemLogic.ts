import { deletePost } from "api/PostsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { ToastModes } from "interfaces/General/ToastModes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostItemLogic = (
  post: PostViewModel,
  setPosts:
    | React.Dispatch<React.SetStateAction<PostViewModel[] | undefined>>
    | undefined
) => {
  const { isTablet, isMobile, isVerySmallMobile } = useAppResponsiveness();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const deleteItemButton = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const naviateToItemOverview = (post: PostViewModel, e: any) => {
    if (
      deleteItemButton.current &&
      !deleteItemButton.current.contains(e.target)
    ) {
      navigate(
        `/${administrationRoute}/${articlesRoute}/${postsRoute}/${post.id}`,
        { state: post }
      );
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteItem = async () => {
    await deletePost(post.id);
    setIsDeleteModalOpen(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    setPosts &&
      setPosts((oldPosts) => {
        if (!oldPosts) {
          return oldPosts;
        }
        const foundPostIndex = oldPosts.findIndex(
          (item) => item.id === post.id
        );
        if (foundPostIndex === -1 || !oldPosts) {
          return oldPosts;
        }
        oldPosts.splice(foundPostIndex, 1);
        return [...oldPosts];
      });
    SyncToast({
      mode: ToastModes.Info,
      description: "You have successfully removed this post",
    });
  };

  return {
    naviateToItemOverview,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteItem,
    openDeleteModal,
    deleteItemButton,
    isTablet,
    isMobile,
    isVerySmallMobile,
  };
};

export default PostItemLogic;
