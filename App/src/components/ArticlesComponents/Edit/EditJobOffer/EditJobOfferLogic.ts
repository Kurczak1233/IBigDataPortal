import { editJobOffer } from "api/JobOffersClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { UserRoles } from "enums/UserRoles";
import { ToastModes } from "interfaces/General/ToastModes";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { IEditJobOfferForm, IEditJobOfferRequest } from "./IEditJobOfferForm";
interface IEditPostPageLogic {
  jobOffer: JobOfferViewModel;
  jobOfferFiles: File[];
}

const EditPostPageLogic = ({ jobOffer, jobOfferFiles }: IEditPostPageLogic) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [commentsPermission, setCommentsPermission] = useState<UserRoles>(
    jobOffer.commentsPermissions
  );
  const [visibilityPermissions, setVisibilityPermissions] = useState<UserRoles>(
    jobOffer.articleVisibilityPermissions
  );
  const navigate = useNavigate();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IEditJobOfferForm>();

  const handleAddFiles = async (newFiles: File[]) => {
    const filesToAdd = newFiles.filter((item) => "path" in item);
    await Promise.all(
      filesToAdd.map(async (fileToUpload) => {
        await addFile(jobOffer.id, fileToUpload, FileModuleEnum.jobOffersFiles);
      })
    );
  };

  const submitForm = async (data: IEditJobOfferForm) => {
    if (isHtmlStringEmpty(data.description)) {
      return setError("description", { type: "required" });
    }
    const request: IEditJobOfferRequest = {
      ...data,
      postId: jobOffer.id,
      commentsPermissions: commentsPermission,
      visibilityPermissions: visibilityPermissions,
    };
    setIsSaving(true);
    await handleAddFiles(jobOfferFiles);
    await editJobOffer(request);
    setIsSaving(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${jobOffersRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have edited a job offer",
    });
  };

  const setPostEditValues = useCallback(() => {
    setValue("title", jobOffer.title);
    setValue("description", jobOffer.description);
    setValue("link", jobOffer.link);
    setValue("jobOfferId", jobOffer.id);
  }, [
    jobOffer.description,
    jobOffer.id,
    jobOffer.link,
    jobOffer.title,
    setValue,
  ]);

  useEffect(() => {
    setPostEditValues();
  }, [setPostEditValues]);

  return {
    submitForm,
    register,
    control,
    handleSubmit,
    errors,
    isSaving,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  };
};

export default EditPostPageLogic;
