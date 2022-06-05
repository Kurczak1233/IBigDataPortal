import { editJobOffer } from "api/JobOffersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IEditJobOfferForm } from "./IEditJobOfferForm";

const EditPostPageLogic = (jobOffer: JobOfferViewModel) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditJobOfferForm>();
  const submitForm = async (data: IEditJobOfferForm) => {
    await editJobOffer(data);
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

  return { submitForm, register, handleSubmit, errors };
};

export default EditPostPageLogic;
