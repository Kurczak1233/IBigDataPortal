import { editPost } from "api/PostsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEditPostForm } from "./IEditPostForm";

const EditPostLogic = (post: PostViewModel, postFiles: File[]) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>();
  const submitForm = async (data: IEditPostForm) => {
    console.log(postFiles);
    //TODO Wybrać tylko nowe!
    await editPost(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have edited a post",
    });
  };

  // const submitForm = async (data: ICreatePostForm) => {
  //   setIsPostCreating(true);
  //   const newPostId = await createPost(data);
  //   await handleUploadFiles(newPostId);
  //   setIsPostCreating(false);
  //   navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
  //   SyncToast({
  //     mode: ToastModes.Success,
  //     description: "You have created a post",
  //   });
  // };

  // const handleUploadFiles = async (newPostId: number) => {
  //   if (!newPostId) {
  //     return SyncToast({
  //       mode: ToastModes.Error,
  //       description: "Item id was not found.",
  //     });
  //   }
  //   await Promise.all(
  //     postFiles.map(async (fileToUpload) => {
  //       await addFile(newPostId, fileToUpload, FileModuleEnum.postsFiles);
  //     })
  //   );
  // };

  const setPostEditValues = useCallback(() => {
    setValue("title", post.title);
    setValue("description", post.description);
    setValue("postId", post.id);
  }, [post.description, post.id, post.title, setValue]);

  useEffect(() => {
    setPostEditValues();
  }, [setPostEditValues]);

  return {
    submitForm,
    register,
    handleSubmit,
    errors,
  };
};

export default EditPostLogic;
