import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";

interface IJobOffersContent {
  jobOffers: JobOfferViewModel[];
}

const JobOffersContent = ({ jobOffers }: IJobOffersContent) => {
  return <div>Job oofers conent</div>;
};

export default JobOffersContent;
