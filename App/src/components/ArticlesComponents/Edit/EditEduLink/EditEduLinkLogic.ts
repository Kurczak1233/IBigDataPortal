import { editEduLink } from "api/EduLinksClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { ToastModes } from "interfaces/General/ToastModes";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { IEditEduLinkForm, IEditEduLinkRequest } from "./IEditEduLinkForm";

interface IEditEduLinkLogic {
  eduLink: EduLinkViewModel;
  eduLinkFiles: File[];
}

const EditEduLinkLogic = ({ eduLink, eduLinkFiles }: IEditEduLinkLogic) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [commentsPermission, setCommentsPermission] = useState<UserRoles>(
    eduLink.commentsPermissions
  );
  const [visibilityPermissions, setVisibilityPermissions] = useState<UserRoles>(
    eduLink.articleVisibilityPermissions
  );
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<IEditEduLinkForm>();

  const handleAddFiles = async (newFiles: File[]) => {
    const filesToAdd = newFiles.filter((item) => "path" in item);
    await Promise.all(
      filesToAdd.map(async (fileToUpload) => {
        await addFile(eduLink.id, fileToUpload, FileModuleEnum.eduLinksFiles);
      })
    );
  };

  const submitForm = async (data: IEditEduLinkForm) => {
    if (isHtmlStringEmpty(data.description)) {
      return setError("description", { type: "required" });
    }
    const request: IEditEduLinkRequest = {
      ...data,
      postId: eduLink.id,
      commentsPermissions: commentsPermission,
      visibilityPermissions: visibilityPermissions,
    };

    setIsSaving(true);
    await handleAddFiles(eduLinkFiles);
    await editEduLink(request);
    setIsSaving(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${eduLinksRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have edited a edu link",
    });
  };

  const setPostEditValues = useCallback(() => {
    setValue("title", eduLink.title);
    setValue("description", eduLink.description);
    setValue("link", eduLink.link);
    setValue("eduLinkId", eduLink.id);
  }, [eduLink.description, eduLink.id, eduLink.link, eduLink.title, setValue]);

  useEffect(() => {
    setPostEditValues();
  }, [setPostEditValues]);

  return {
    submitForm,
    register,
    handleSubmit,
    control,
    errors,
    isSaving,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  };
};

export default EditEduLinkLogic;
