import { createJobOffer } from "api/JobOffersClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { addFile } from "components/common/FileModal/FilesAppendDataHelper";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreateJobOffer } from "./ICreateJobOfferForm";

const CreateJobOfferPageLogic = () => {
  const [jobOfferFiles, setJobOffersFiles] = useState<File[]>([]);
  const [isJobOfferCreating, setIsjobOfferreating] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateJobOffer>();
  const submitForm = async (data: ICreateJobOffer) => {
    setIsjobOfferreating(true);
    const newJobOfferId = await createJobOffer(data);
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
    setJobOffersFiles,
    jobOfferFiles,
    isJobOfferCreating,
  };
};
export default CreateJobOfferPageLogic;
