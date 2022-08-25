import JobOffersContent from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersContent/JobOffersContent";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
import JobOffersPageLogic from "./JobOffersPageLogic";

const JobOffersPage = () => {
  const { jobOffers, setJobOffers } = JobOffersPageLogic();
  return (
    <>
      {jobOffers ? (
        <JobOffersContent jobOffers={jobOffers} setJobOffers={setJobOffers} />
      ) : (
        <BigLoader />
      )}
    </>
  );
};

export default JobOffersPage;
