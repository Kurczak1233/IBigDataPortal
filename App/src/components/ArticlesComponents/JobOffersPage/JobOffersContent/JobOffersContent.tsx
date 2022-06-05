import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import styles from "./JobOffersContent.module.scss";
import JobOfferContentLogic from "./JobOffersContentLogic";
import JobOffersHeader from "./JobOffersHeader/JobOffersHeader";
import JobOffersItems from "./JobOffersItems/JobOffersItems";

interface IJobOffersContent {
  jobOffers: JobOfferViewModel[];
}

const JobOffersContent = ({ jobOffers }: IJobOffersContent) => {
  const { navigateToCreateJobOffer } = JobOfferContentLogic();
  return (
    <>
      {jobOffers.length === 0 ? (
        <NoItemsComponent
          title={"There are no job offers"}
          navigateToPage={navigateToCreateJobOffer}
        />
      ) : (
        <>
          <div className={styles.title}>Overview posts</div>
          <JobOffersHeader
            iconsColour={AvailableIntensiveColors.IntensiveBlue}
          />
          <JobOffersItems
            jobOfferColor={AvailableIntensiveColors.LessIntensiveBlue}
            jobOffers={jobOffers}
            paginationColor={AvailablePaginationColors.blue}
          />
        </>
      )}
    </>
  );
};

export default JobOffersContent;
