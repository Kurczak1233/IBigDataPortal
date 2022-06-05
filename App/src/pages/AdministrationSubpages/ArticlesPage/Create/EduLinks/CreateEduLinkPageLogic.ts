import { createEduLink } from "api/EduLinksClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  eduLinksRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICreateEduLink } from "./ICreateEduLinkForm";

const CreateEduLinkPageLogic = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEduLink>();
  const submitForm = async (data: ICreateEduLink) => {
    await createEduLink(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${eduLinksRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a edu link",
    });
  };
  return { submitForm, register, handleSubmit, errors };
};

export default CreateEduLinkPageLogic;
