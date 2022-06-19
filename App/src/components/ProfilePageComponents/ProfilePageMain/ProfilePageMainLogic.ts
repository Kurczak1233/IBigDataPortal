import { getLastUploadedFileFromServer } from "api/FileClient";
import { updateUserNickname } from "api/UsersClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IUpdateProfileForm } from "./IUpdateProfileForm";

interface IProfillePageMainLogic {
  userProfile: IApplicationUser;
}

const ProfilePageMainLogic = ({ userProfile }: IProfillePageMainLogic) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<FileVm>();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IUpdateProfileForm>();
  const applicationUserId = useSelector(
    (state: RootState) => state.applicationUserReducer.user?.id
  );
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

  const handleGetProfilePicture = useCallback(async () => {
    if (!applicationUserId) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Application user is not found",
      });
    }
    const result = await getLastUploadedFileFromServer(
      applicationUserId,
      FileModuleEnum.userImage
    );
    setProfilePic(result);
  }, [applicationUserId]);

  useEffect(() => {
    handleGetProfilePicture();
  }, [handleGetProfilePicture]);

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
    profilePic,
    handleSetShowEdit,
    handleChangeNickname,
    handleGetProfilePicture,
    setProfilePic,
  };
};

export default ProfilePageMainLogic;
