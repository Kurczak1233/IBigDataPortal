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
}

const EduLinkItem = ({
  eduLink,
  eduLinkColor,
  interactive = true,
}: IEduLinkItem) => {
  const { naviateToItemOverview } = EduLinkItemLogic();
  return (
    <div
      className={styles.item}
      style={{
        background: `#${eduLinkColor}`,
        cursor: interactive ? "pointer" : "initial",
      }}
      id={interactive ? `articlePost${eduLinkColor}` : ""}
      onClick={() => naviateToItemOverview(eduLink)}
    >
      <div className={styles.posted}>
        {format(new Date(eduLink.posted), standarizedFormat)}
      </div>
      <div className={styles.title}>{eduLink.title}</div>
      <div className={styles.creator}>{eduLink.userEmail}</div>
    </div>
  );
};

export default EduLinkItem;
