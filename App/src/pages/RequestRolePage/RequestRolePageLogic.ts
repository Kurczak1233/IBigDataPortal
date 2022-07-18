import { createCooperationRequest } from "api/CooperationsClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateCooperationsLenght } from "redux/slices/cooperationsSlice";
import { RequestRoleForm } from "./RequestRoleForm";

const RequestRolePageLogic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestRoleForm>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitRequest = async (data: RequestRoleForm) => {
    await createCooperationRequest(data);
    dispatch(calculateCooperationsLenght());
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a request",
    });
    navigateToMainPage();
  };

  const navigateToMainPage = () => {
    navigate("/");
  };

  return { register, submitRequest, errors, navigateToMainPage, handleSubmit };
};

export default RequestRolePageLogic;
