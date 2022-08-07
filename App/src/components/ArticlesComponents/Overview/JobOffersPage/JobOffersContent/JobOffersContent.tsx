import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import { ArticlesTypes } from "enums/ArticlesTypes";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import JobOffersHeader from "../JobOffersHeader/JobOffersHeader";
import JobOffersItems from "../JobOffersItems/JobOffersItems";
import JobOfferContentLogic from "./JobOffersContentLogic";

interface IJobOffersContent {
  jobOffers: JobOfferViewModel[];
  setJobOffers: React.Dispatch<
    React.SetStateAction<JobOfferViewModel[] | undefined>
  >;
}

const JobOffersContent = ({ jobOffers, setJobOffers }: IJobOffersContent) => {
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
          <AdministartionPageHeader
            pageTitle={"Overview job offers"}
            showFilterComponent
            articleType={ArticlesTypes.JobOffer}
          />
          <JobOffersHeader
            iconsColour={AvailableIntensiveColors.IntensiveBlue}
          />
          <JobOffersItems
            jobOfferColor={AvailableIntensiveColors.LessIntensiveBlue}
            jobOffers={jobOffers}
            paginationColor={AvailablePaginationColors.blue}
            setJobOffers={setJobOffers}
          />
        </>
      )}
    </>
  );
};

export default JobOffersContent;
