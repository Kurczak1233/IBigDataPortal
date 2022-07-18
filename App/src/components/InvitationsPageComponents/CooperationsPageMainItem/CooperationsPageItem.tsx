import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";
import styles from "./CooperationsPageItem.module.scss";

interface ICooperationsPageItem {
  setAllCooperations: React.Dispatch<React.SetStateAction<CooperationVm[]>>;
  cooperation: CooperationVm;
}

const CooperationsPageItem = ({
  setAllCooperations,
  cooperation,
}: ICooperationsPageItem) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemsWrapper}>
        <div className={styles.creatorEmail}>{cooperation.creatorEmail}</div>
        <div className={styles.createdOn}>
          {format(new Date(cooperation.createdOn), standarizedFormat)}
        </div>
      </div>
      <div className={styles.deleteButtonWrapper}>
        <SmallButton
          text={"Archive"}
          onClick={() => null}
          width={"100px"}
          marginLeft={"16px"}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
    </div>
  );
};

export default CooperationsPageItem;
