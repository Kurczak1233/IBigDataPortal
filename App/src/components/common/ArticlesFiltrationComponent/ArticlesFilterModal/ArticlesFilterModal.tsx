import Modal from "react-modal";
import styles from "./ArticlesFilterModal.module.scss";
import GrayExiticon from "public/GrayExitIcon.svg";
import OrangeExiticon from "public/OrangeExitIcon.svg";
import ArticlesFilterModalLogic from "./ArticlesFilterModalLogic";
import { ArticlesTypes } from "enums/ArticlesTypes";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import DatepickerWithLabel from "components/common/Forms/DatepickerWIthLabel/DatepickerWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";

interface IArticlesFilterModal {
  isModalOpen: boolean;
  onCloseModal: () => void;
  articleType: ArticlesTypes;
}

const ArticlesFilterModal = ({
  isModalOpen,
  onCloseModal,
  articleType,
}: IArticlesFilterModal) => {
  const { isExitHoverActive, setIsExitHoverActive, register, errors, control } =
    ArticlesFilterModalLogic();
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      className={styles.fileModal}
      overlayClassName={styles.fileModalOverlay}
      ariaHideApp={false}
    >
      <header className={styles.header}>
        <div className={styles.modalTitle}>{articleType}s filtration</div>
        <img
          onClick={onCloseModal}
          onMouseEnter={() => setIsExitHoverActive(true)}
          onMouseLeave={() => setIsExitHoverActive(false)}
          src={isExitHoverActive ? OrangeExiticon : GrayExiticon}
          alt="Close modal icon"
        />
      </header>
      <SeparationSmallBar
        marginBottom="12px"
        marginTop="12px"
        color={AvailableIntensiveColors.IntensiveOrange}
      />
      <div>
        <DatepickerWithLabel
          label={"From"}
          control={control}
          registerName={"from"}
          placeholder={"Enter from date..."}
          selected={null}
          handleDateChange={function (date: Date | null): void {
            throw new Error("Function not implemented.");
          }}
        />
        <DatepickerWithLabel
          label={"To"}
          control={control}
          placeholder={"Enter to date..."}
          registerName={"to"}
          selected={null}
          handleDateChange={function (date: Date | null): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <InputWithLabel
        register={register}
        errors={errors}
        errorMessage={"This field is required"}
        label={"Title"}
        placeholder={"Enter title..."}
        registerName={"title"}
        registerOptions={{ required: true }}
      />
      <InputWithLabel
        register={register}
        errors={errors}
        errorMessage={"This field is required"}
        label={"Creator"}
        placeholder={"Search creator..."}
        registerName={"title"}
        registerOptions={{ required: true }}
      />
    </Modal>
  );
};

export default ArticlesFilterModal;
