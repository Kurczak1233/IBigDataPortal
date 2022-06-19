interface IConfirmActionModalLogic {
  setIsConfirmActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmActionModalLogic = ({
  setIsConfirmActionModalOpen,
}: IConfirmActionModalLogic) => {
  const handleCloseModal = () => {
    setIsConfirmActionModalOpen(false);
  };
  return { handleCloseModal };
};

export default ConfirmActionModalLogic;
