import { getLastUploadedFileFromServer } from "api/FileClient";
import { getApplicationUser } from "api/UsersClient";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useCallback, useEffect, useState } from "react";

const ProfilePageLogic = () => {
  const [userProfile, setUserProfile] = useState<IApplicationUser>();
  const [profilePic, setProfilePic] = useState<FileVm>();

  const handleGetUserProfileRequest = async () => {
    setUserProfile(await getApplicationUser());
  };

  const handleGetProfilePicture = useCallback(async () => {
    if (!userProfile) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "Application user is not found",
      });
      //TODO Log out!
    }
    const result = await getLastUploadedFileFromServer(
      userProfile.id,
      FileModuleEnum.userImage
    );
    setProfilePic(result);
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      handleGetProfilePicture();
    }
  }, [handleGetProfilePicture, userProfile]);

  useEffect(() => {
    handleGetUserProfileRequest();
  }, []);

  return { userProfile, profilePic, setProfilePic, handleGetProfilePicture };
};
export default ProfilePageLogic;
