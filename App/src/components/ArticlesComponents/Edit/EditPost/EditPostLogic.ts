import { editPost } from "api/PostsClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { ToastModes } from "interfaces/General/ToastModes";
import { PostViewModel } from "interfaces/Models/Posts/ViewModels/PostViewModel";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { IEditPostForm, IEditPostRequest } from "./IEditPostForm";

const EditPostLogic = (post: PostViewModel, postFiles: File[]) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [commentsPermission, setCommentsPermission] = useState<UserRoles>(
    post.commentsPermissions
  );
  const [visibilityPermissions, setVisibilityPermissions] = useState<UserRoles>(
    post.articleVisibilityPermissions
  );
  const navigate = useNavigate();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    setError,
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
    if (isHtmlStringEmpty(data.description)) {
      return setError("description", { type: "required" });
    }
    const request: IEditPostRequest = {
      ...data,
      postId: post.id,
      commentsPermissions: commentsPermission,
      visibilityPermissions: visibilityPermissions,
    };
    setIsSaving(true);
    await handleAddFiles(postFiles);
    await editPost(request);
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
    control,
    isSaving,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  };
};

export default EditPostLogic;
