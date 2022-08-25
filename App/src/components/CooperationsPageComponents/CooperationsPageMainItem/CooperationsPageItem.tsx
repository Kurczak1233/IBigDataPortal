import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
import styles from "./CooperationsPageItem.module.scss";
import CooperationsPageItemLogic from "./CooperationsPageItemLogic";

interface ICooperationsPageItem {
  cooperation: CooperationVm;
  archived: boolean;
  clickActive?: boolean;
}

const CooperationsPageItem = ({
  cooperation,
  archived,
  clickActive = true,
}: ICooperationsPageItem) => {
  const { archiveItem, navigateToDetails, deleteItemButton, isMobile } =
    CooperationsPageItemLogic(cooperation);
  return (
    <div
      className={clickActive ? styles.item : styles.itemNoHover}
      onClick={(e) => clickActive && navigateToDetails(e)}
    >
      {!isMobile ? (
        <div className={styles.itemsWrapper}>
          <div className={styles.creatorEmail}>
            <span>{cooperation.creatorEmail}</span>
          </div>
          <div className={styles.createdOn}>
            {format(new Date(cooperation.createdOn), standarizedFormat)}
          </div>
        </div>
      ) : (
        <div className={styles.creatorEmail}>
          <span>{cooperation.creatorEmail}</span>
        </div>
      )}
      {!archived ? (
        <div className={styles.deleteButtonWrapper}>
          <SmallButton
            itemRef={deleteItemButton}
            text={"Archive"}
            onClick={archiveItem}
            width={isMobile ? "70px" : "100px"}
            color={AvailableIntensiveColors.IntensiveRed}
          />
        </div>
      ) : (
        <div className={styles.deleteButtonWrapper} />
      )}
    </div>
  );
};

export default CooperationsPageItem;
