import ArticleContent from "components/common/ArticleCommonComponents/ArticleContent/ArticleContent";
import ArticleHeader from "components/common/ArticleCommonComponents/ArticleHeader/ArticleHeader";
import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import styles from "./JobOffersContent.module.scss";
import JobOfferContentLogic from "./JobOffersContentLogic";

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
          <ArticleHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
          <ArticleContent
            postsColor={AvailableIntensiveColors.LessIntensiveBlue}
            posts={jobOffers}
            paginationColor={AvailablePaginationColors.blue}
          />
        </>
      )}
    </>
  );
};

export default JobOffersContent;
