import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import Modal from "react-modal";
import styles from "./ConfirmActionModal.module.scss";
import ConfirmActionModalLogic from "./ConfirmActionModalLogic";

interface IConfirmActionModal {
  isConfimActionModalOpen: boolean;
  setIsConfirmActionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  handleConfirmAction: () => void;
}

const ConfirmActionModal = ({
  isConfimActionModalOpen,
  setIsConfirmActionModalOpen,
  description,
  handleConfirmAction,
}: IConfirmActionModal) => {
  const { handleCloseModal } = ConfirmActionModalLogic({
    setIsConfirmActionModalOpen,
  });
  return (
    <Modal
      isOpen={isConfimActionModalOpen}
      onRequestClose={handleCloseModal}
      className={styles.confirmActionModal}
      overlayClassName={styles.confirmActionModalOverlay}
      ariaHideApp={false}
    >
      <div className={styles.modalTitle}>Confirm action</div>
      <SeparationSmallBar
        color={AvailableIntensiveColors.IntensiveRed}
        marginTop="8px"
        marginBottom="16px"
      />
      <div className={styles.description}>
        Are you sure you want to {description}?
      </div>
      <div className={styles.buttons}>
        <SmallButton
          text={"Cancel"}
          onClick={handleCloseModal}
          color={AvailableIntensiveColors.IntensiveBlue}
        />
        <SmallButton
          text={"Confirm"}
          marginLeft={"16px"}
          onClick={handleConfirmAction}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
    </Modal>
  );
};

export default ConfirmActionModal;
