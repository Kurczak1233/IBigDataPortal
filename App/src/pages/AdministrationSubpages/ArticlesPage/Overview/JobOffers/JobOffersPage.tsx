import JobOffersContent from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersContent/JobOffersContent";
import BigLoader from "components/common/Loaders/BigLoader";
import JobOffersPageLogic from "./JobOffersPageLogic";

const JobOffersPage = () => {
  const { jobOffers } = JobOffersPageLogic();
  return (
    <>
      {jobOffers ? <JobOffersContent jobOffers={jobOffers} /> : <BigLoader />}
    </>
  );
};

export default JobOffersPage;
