import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RequestRoleForm } from "./RequestRoleForm";

const RequestRolePageLogic = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RequestRoleForm>();

  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/");
  };

  return { register, errors, navigateToMainPage };
};

export default RequestRolePageLogic;
