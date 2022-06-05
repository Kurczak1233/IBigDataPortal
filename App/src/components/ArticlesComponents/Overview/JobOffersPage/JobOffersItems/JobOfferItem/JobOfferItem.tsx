import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import styles from "./JobOfferItem.module.scss";
import PostItemLogic from "./JobOfferItemLogic";

interface IJobOfferItem {
  jobOffer: JobOfferViewModel;
  jobOfferColor: AvailableIntensiveColors;
  interactive?: boolean;
}

const JobOfferItem = ({
  jobOffer,
  jobOfferColor,
  interactive = true,
}: IJobOfferItem) => {
  const { naviateToItemOverview } = PostItemLogic();
  return (
    <div
      className={styles.item}
      style={{
        background: `#${jobOfferColor}`,
        cursor: interactive ? "pointer" : "initial",
      }}
      id={interactive ? `articlePost${jobOfferColor}` : ""}
      onClick={() => naviateToItemOverview(jobOffer)}
    >
      <div className={styles.posted}>
        {format(new Date(jobOffer.posted), standarizedFormat)}
      </div>
      <div className={styles.title}>{jobOffer.title}</div>
      <div className={styles.creator}>{jobOffer.userEmail}</div>
    </div>
  );
};

export default JobOfferItem;
