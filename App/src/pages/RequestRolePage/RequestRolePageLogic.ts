import { createCooperationRequest } from "api/CooperationsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RequestRoleForm } from "./RequestRoleForm";

const RequestRolePageLogic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestRoleForm>();

  const navigate = useNavigate();

  const submitRequest = async (data: RequestRoleForm) => {
    await createCooperationRequest(data);
    return SyncToast({
      mode: ToastModes.Success,
      description: "You have created a request",
    });
  };

  const navigateToMainPage = () => {
    navigate("/");
  };

  return { register, submitRequest, errors, navigateToMainPage, handleSubmit };
};

export default RequestRolePageLogic;
