import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import styles from "./EduLinkItem.module.scss";
import EduLinkItemLogic from "./EduLinkItemLogic";

interface IEduLinkItem {
  eduLink: EduLinkViewModel;
  eduLinkColor: AvailableIntensiveColors;
  interactive?: boolean;
  setEduLinks?: React.Dispatch<
    React.SetStateAction<EduLinkViewModel[] | undefined>
  >;
}

const EduLinkItem = ({
  eduLink,
  eduLinkColor,
  setEduLinks,
  interactive = true,
}: IEduLinkItem) => {
  const {
    naviateToItemOverview,
    openDeleteModal,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteItem,
    deleteItemButton,
    isTablet,
    isMobile,
  } = EduLinkItemLogic(eduLink, setEduLinks);
  return (
    <>
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteModalOpen}
        description={"delete this edu link"}
        handleConfirmAction={handleDeleteItem}
      />
      <div
        className={styles.item}
        style={{
          background: `#${eduLinkColor}`,
          cursor: interactive ? "pointer" : "initial",
        }}
        id={interactive ? `articlePost${eduLinkColor}` : ""}
        onClick={(e) => naviateToItemOverview(eduLink, e)}
      >
        <div className={styles.posted}>
          {format(new Date(eduLink.posted), standarizedFormat)}
        </div>
        <div className={styles.title}>{eduLink.title}</div>
        {!(isTablet || isMobile) && (
          <div className={styles.creator}>{eduLink.userEmail}</div>
        )}
        <SmallButton
          itemRef={deleteItemButton}
          text={"Delete"}
          width={!(isTablet || isMobile) ? "100px" : "75px"}
          onClick={openDeleteModal}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
    </>
  );
};

export default EduLinkItem;
