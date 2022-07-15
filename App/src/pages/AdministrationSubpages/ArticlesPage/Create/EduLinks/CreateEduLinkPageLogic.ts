import { createEduLink } from "api/EduLinksClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreateEduLink, ICreateEduLinkRequest } from "./ICreateEduLinkForm";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { UserRoles } from "enums/UserRoles";

const CreateEduLinkPageLogic = () => {
  const [eduLinksFiles, setEduLinksFiles] = useState<File[]>([]);
  const [isEduLinkCreating, setIsEduLinkCreating] = useState<boolean>(false);
  const [commentsPermission, setCommentsPermission] = useState<UserRoles>(
    UserRoles.StudentOrBusiness
  );
  const [visibilityPermissions, setVisibilityPermissions] = useState<UserRoles>(
    UserRoles.Everybody
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<ICreateEduLink>();
  const submitForm = async (data: ICreateEduLink) => {
    if (isHtmlStringEmpty(data.description)) {
      return setError("description", { type: "required" });
    }
    const request: ICreateEduLinkRequest = {
      ...data,
      commentsPermissions: commentsPermission,
      visibilityPermissions: visibilityPermissions,
    };
    setIsEduLinkCreating(true);
    const eduLinkId = await createEduLink(request);
    await handleUploadFiles(eduLinkId);
    setIsEduLinkCreating(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${eduLinksRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a edu link",
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
      eduLinksFiles.map(async (fileToUpload) => {
        await addFile(newPostId, fileToUpload, FileModuleEnum.eduLinksFiles);
      })
    );
  };

  return {
    submitForm,
    register,
    handleSubmit,
    errors,
    eduLinksFiles,
    setEduLinksFiles,
    control,
    isEduLinkCreating,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  };
};

export default CreateEduLinkPageLogic;
