import { editPost } from "api/PostsClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEditPostForm } from "./IEditPostForm";

const EditPostLogic = (post: PostViewModel, postFiles: File[]) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>();

  const handleAddFiles = async (newFiles: File[]) => {
    const filesToAdd = newFiles.filter((item) => "path" in item);
    await Promise.all(
      filesToAdd.map(async (fileToUpload) => {
        await addFile(post.id, fileToUpload, FileModuleEnum.postsFiles);
      })
    );
  };

  const submitForm = async (data: IEditPostForm) => {
    setIsSaving(true);
    await handleAddFiles(postFiles);
    await editPost(data);
    setIsSaving(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have edited a post",
    });
  };

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
    isSaving,
  };
};

export default EditPostLogic;
