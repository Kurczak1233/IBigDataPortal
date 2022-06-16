import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import {
  administrationRoute,
  articlesRoute,
  postsRoute,
} from "constants/apiRoutes";
import { ToastModes } from "interfaces/General/ToastModes";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUpdateProfileForm } from "./IUpdateProfileForm";

interface IProfillePageMainLogic {
  userProfile: IApplicationUser;
}

const ProfilePageMainLogic = ({ userProfile }: IProfillePageMainLogic) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateProfileForm>();
  const submitForm = async (data: IUpdateProfileForm) => {
    // await createPost(data);
    navigate(`/${administrationRoute}/${articlesRoute}/${postsRoute}`);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have created a post",
    });
  };

  const handleSetInputsBasicValues = useCallback(
    (userProfile: IApplicationUser) => {
      setValue("name", userProfile.nickname);
    },
    [setValue]
  );

  useEffect(() => {
    if (userProfile) {
      handleSetInputsBasicValues(userProfile);
    }
  }, [handleSetInputsBasicValues, userProfile]);

  return { submitForm, register, handleSubmit, errors };
};

export default ProfilePageMainLogic;
