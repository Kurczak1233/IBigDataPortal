import { createJobOffer } from "api/JobOffersClient";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isHtmlStringEmpty } from "utils/IsHtmlStringEmpty/isHtmlStringEmpty";
import { ICreateJobOffer, ICreateJobOfferRequest } from "./ICreateJobOfferForm";

const CreateJobOfferPageLogic = () => {
  const [jobOfferFiles, setJobOffersFiles] = useState<File[]>([]);
  const [isJobOfferCreating, setIsjobOfferreating] = useState<boolean>(false);
  const [commentsPermission, setCommentsPermission] = useState<UserRoles>(
    UserRoles.StudentOrBusiness
  );
  const [visibilityPermissions, setVisibilityPermissions] = useState<UserRoles>(
    UserRoles.Everybody
  );
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateJobOffer>();
  const submitForm = async (data: ICreateJobOffer) => {
    if (isHtmlStringEmpty(data.description)) {
      return setError("description", { type: "required" });
    }
    const request: ICreateJobOfferRequest = {
      ...data,
      commentsPermissions: commentsPermission,
      visibilityPermissions: visibilityPermissions,
    };
    setIsjobOfferreating(true);
    const newJobOfferId = await createJobOffer(request);
    await handleUploadFiles(newJobOfferId);
    setIsjobOfferreating(false);
    navigate(`/${administrationRoute}/${articlesRoute}/${jobOffersRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a job offer",
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
      jobOfferFiles.map(async (fileToUpload) => {
        await addFile(newPostId, fileToUpload, FileModuleEnum.jobOffersFiles);
      })
    );
  };

  return {
    submitForm,
    register,
    handleSubmit,
    errors,
    control,
    setJobOffersFiles,
    jobOfferFiles,
    isJobOfferCreating,
    setCommentsPermission,
    commentsPermission,
    setVisibilityPermissions,
    visibilityPermissions,
  };
};
export default CreateJobOfferPageLogic;
