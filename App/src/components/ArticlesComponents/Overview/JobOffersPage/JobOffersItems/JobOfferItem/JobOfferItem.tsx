import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { standarizedFormat } from "constants/dateFormats";
import { format } from "date-fns";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import styles from "./JobOfferItem.module.scss";
import JobOfferItemLogic from "./JobOfferItemLogic";

interface IJobOfferItem {
  jobOffer: JobOfferViewModel;
  jobOfferColor: AvailableIntensiveColors;
  interactive?: boolean;
  setJobOffers?: React.Dispatch<
    React.SetStateAction<JobOfferViewModel[] | undefined>
  >;
}

const JobOfferItem = ({
  jobOffer,
  jobOfferColor,
  setJobOffers,
  interactive = true,
}: IJobOfferItem) => {
  const {
    naviateToItemOverview,
    deleteItemButton,
    openDeleteModal,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteItem,
    isTablet,
    isMobile,
  } = JobOfferItemLogic(jobOffer, setJobOffers);
  return (
    <>
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteModalOpen}
        description={"delete this job offer"}
        handleConfirmAction={handleDeleteItem}
      />
      <div
        className={styles.item}
        style={{
          background: `#${jobOfferColor}`,
          cursor: interactive ? "pointer" : "initial",
        }}
        id={interactive ? `articlePost${jobOfferColor}` : ""}
        onClick={(e) => naviateToItemOverview(jobOffer, e)}
      >
        <div className={styles.posted}>
          {format(new Date(jobOffer.posted), standarizedFormat)}
        </div>
        <div className={styles.title}>{jobOffer.title}</div>
        {!(isTablet || isMobile) && (
          <div className={styles.creator}>{jobOffer.userEmail}</div>
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

export default JobOfferItem;
