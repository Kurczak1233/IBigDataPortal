import { useState } from "react";

const ProfilePictureLogic = () => {
  const [isPictureModalOpen, setIsPictureModalOpen] = useState<boolean>(false);

  const handleOpenPictureModal = () => {
    setIsPictureModalOpen(true);
  };
  return {
    setIsPictureModalOpen,
    isPictureModalOpen,
    handleOpenPictureModal,
  };
};

export default ProfilePictureLogic;
