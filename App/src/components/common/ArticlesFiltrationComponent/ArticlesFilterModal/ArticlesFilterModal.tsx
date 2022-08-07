import Modal from "react-modal";
import styles from "./ArticlesFilterModal.module.scss";
import GrayExiticon from "public/GrayExitIcon.svg";
import OrangeExiticon from "public/OrangeExitIcon.svg";
import ArticlesFilterModalLogic from "./ArticlesFilterModalLogic";
import { ArticlesTypes } from "enums/ArticlesTypes";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import DatepickerWithLabel from "components/common/Forms/DatepickerWIthLabel/DatepickerWithLabel";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import SeparationLongBar from "components/common/SeparationLongBar/SeparationLongBar";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";

interface IArticlesFilterModal {
  isModalOpen: boolean;
  onCloseModal: () => void;
  articleType: ArticlesTypes;
  setFiltersSet?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticlesFilterModal = ({
  isModalOpen,
  onCloseModal,
  articleType,
  setFiltersSet,
}: IArticlesFilterModal) => {
  const {
    isExitHoverActive,
    setIsExitHoverActive,
    register,
    errors,
    control,
    resetAndLeave,
    handleSubmit,
    filterItems,
  } = ArticlesFilterModalLogic(onCloseModal, articleType, setFiltersSet);
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
      <SeparationLongBar
        marginBottom="12px"
        marginTop="12px"
        barColor={AvailableIntensiveColors.IntensiveOrange}
      />
      <div>
        <DatepickerWithLabel
          label={"From"}
          control={control}
          registerName={"from"}
          placeholder={"Enter from date..."}
        />
        <DatepickerWithLabel
          label={"To"}
          control={control}
          placeholder={"Enter to date..."}
          registerName={"to"}
        />
      </div>
      <InputWithLabel
        register={register}
        errors={errors}
        errorMessage={""}
        label={"Title"}
        placeholder={"Enter title..."}
        registerName={"title"}
      />
      <InputWithLabel
        register={register}
        errors={errors}
        errorMessage={""}
        label={"Creator"}
        placeholder={"Search creator..."}
        registerName={"creator"}
      />
      <footer className={styles.footer}>
        <SmallButton
          text={"Cancel"}
          width={"100px"}
          onClick={resetAndLeave}
          color={AvailableIntensiveColors.InactiveGray}
        />
        <SmallButton
          text={"Filter"}
          marginLeft={"16px"}
          width={"100px"}
          onClick={handleSubmit(filterItems)}
          color={AvailableIntensiveColors.IntensiveOrange}
        />
      </footer>
    </Modal>
  );
};

export default ArticlesFilterModal;
