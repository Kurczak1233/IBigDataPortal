import { removeFile } from "api/FileClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useState } from "react";

const ProfilePictureLogic = (userProfile: ApplicationUser) => {
  const [isPictureModalOpen, setIsPictureModalOpen] = useState<boolean>(false);
  const [pictureLoaded, setPictureLoaded] = useState<boolean>(false);
  const [isConfimActionModalOpen, setIsConfimrActionModalOpen] =
    useState<boolean>(false);

  const handleOpenPictureModal = () => {
    setIsPictureModalOpen(true);
  };

  const handleOpenConfirmActionModal = () => {
    setIsConfimrActionModalOpen(true);
  };

  const handleCloseConfirmActionModal = () => {
    setIsConfimrActionModalOpen(false);
  };

  const deletePicture = async () => {
    if (!userProfile) {
      return SyncToast({
        mode: ToastModes.Error,
        description: "User was not found",
      });
    }
    await removeFile(userProfile.profilePictureGuid);
    handleCloseConfirmActionModal();
  };

  return {
    setIsPictureModalOpen,
    isPictureModalOpen,
    handleOpenPictureModal,
    handleOpenConfirmActionModal,
    isConfimActionModalOpen,
    setIsConfimrActionModalOpen,
    deletePicture,
    setPictureLoaded,
    pictureLoaded,
  };
};

export default ProfilePictureLogic;
