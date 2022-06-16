import { updateUserNickname } from "api/UsersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUpdateProfileForm } from "./IUpdateProfileForm";

interface IProfillePageMainLogic {
  userProfile: IApplicationUser;
}

const ProfilePageMainLogic = ({ userProfile }: IProfillePageMainLogic) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IUpdateProfileForm>();
  const handleSetInputsBasicValues = useCallback(
    (userProfile: IApplicationUser) => {
      setValue("nickname", userProfile.nickname);
    },
    [setValue]
  );

  const handleSetShowEdit = () => {
    setShowEdit(true);
  };

  const handleChangeNickname = async () => {
    const request: IUpdateProfileForm = {
      nickname: getValues("nickname"),
    };
    await updateUserNickname(request);
    SyncToast({
      mode: ToastModes.Success,
      description: "You have updated a nickname",
    });
    setShowEdit(false);
  };

  useEffect(() => {
    if (userProfile) {
      handleSetInputsBasicValues(userProfile);
    }
  }, [handleSetInputsBasicValues, userProfile]);

  return {
    register,
    handleSubmit,
    errors,
    showEdit,
    handleSetShowEdit,
    handleChangeNickname,
  };
};

export default ProfilePageMainLogic;
