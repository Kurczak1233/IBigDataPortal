import styles from "./JobOffersItems.module.scss";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import Pagination from "components/common/ArticleCommonComponents/Pagination/Pagination";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import JobOffersItemsLogic from "./JobOffersItemsLogic";
import JobOfferItem from "./JobOfferItem/JobOfferItem";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";

interface IJobOffersItems {
  jobOffers: JobOfferViewModel[];
  jobOfferColor: AvailableIntensiveColors;
  paginationColor: AvailablePaginationColors;
  setJobOffers: React.Dispatch<
    React.SetStateAction<JobOfferViewModel[] | undefined>
  >;
}

const JobOffersItems = ({
  jobOffers,
  jobOfferColor,
  paginationColor,
  setJobOffers,
}: IJobOffersItems) => {
  const { handlePageClick, pageCount, currentItems, refContainer } =
    JobOffersItemsLogic({
      jobOffers,
    });

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content} ref={refContainer}>
        {currentItems.map((jobOffer, index) => (
          <JobOfferItem
            key={`${jobOffer.title}, ${jobOffer.description} ${index}`}
            jobOffer={jobOffer}
            jobOfferColor={jobOfferColor}
            setJobOffers={setJobOffers}
          />
        ))}
      </div>
      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        colorName={paginationColor}
      />
    </div>
  );
};

export default JobOffersItems;
