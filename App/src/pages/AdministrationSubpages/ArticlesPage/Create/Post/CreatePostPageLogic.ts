import { createPost } from "api/PostsClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
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
  const [postFiles, setPostsFiles] = useState<File[]>([]);
  const [isPostCreating, setIsPostCreating] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostForm>();
  const submitForm = async (data: ICreatePostForm) => {
    setIsPostCreating(true);
    const newPostId = await createPost(data);
    await handleUploadFiles(newPostId);
    setIsPostCreating(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a post",
    });
  };

  const handleUploadFiles = async (newPostId: number) => {
    if (!newPostId) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Item id was not found.",
      });
    }
    await Promise.all(
      postFiles.map(async (fileToUpload) => {
        await addFile(newPostId, fileToUpload, FileModuleEnum.postsFiles);
      })
    );
  };

  return {
    submitForm,
    register,
    handleSubmit,
    control,
    errors,
    postFiles,
    setPostsFiles,
    isPostCreating,
  };
};

export default CreatePostPageLogic;
