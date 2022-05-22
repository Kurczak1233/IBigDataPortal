import { createJobOffer } from "api/JobOffersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  jobOffersRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreateJobOffer } from "./ICreateJobOfferForm";

const CreateJobOfferPageLogic = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateJobOffer>();
  const submitForm = async (data: ICreateJobOffer) => {
    await createJobOffer(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${jobOffersRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a job offer",
    });
  };
  return { submitForm, register, handleSubmit, errors };
};
export default CreateJobOfferPageLogic;
