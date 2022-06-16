import { useState } from "react";

const ProfilePictureLogic = () => {
  const [isPictureModalOpen, setIsPictureModalOpen] = useState<boolean>();

  const handleOpenPictureModal = () => {
    setIsPictureModalOpen(true);
  };
  return {
    handleOpenPictureModal,
  };
};

export default ProfilePictureLogic;
