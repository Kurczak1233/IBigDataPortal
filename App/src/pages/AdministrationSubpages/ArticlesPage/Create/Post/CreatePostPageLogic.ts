import { createPost } from "api/PostsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreatePostForm } from "./ICreatePostForm";

const CreatePostPageLogic = () => {
  const [postsFiles, setPostsFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>();
  const submitForm = async (data: ICreatePostForm) => {
    await createPost(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a post",
    });
  };
  return {
    submitForm,
    register,
    handleSubmit,
    errors,
    postFiles: postsFiles,
    setPostsFiles,
  };
};

export default CreatePostPageLogic;
