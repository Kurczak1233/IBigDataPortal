import { useState } from "react";

const ArticlesFiltrationComponentLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, handleOpenModal, handleCloseModal };
};

export default ArticlesFiltrationComponentLogic;
