import { getAllJobOffers } from "api/JobOffersClient";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useState, useEffect } from "react";

const JobOffersPageLogic = () => {
  const [jobOffers, setJobOffers] = useState<JobOfferViewModel[]>();
  const handleGetAllPosts = async () => {
    setJobOffers(await getAllJobOffers());
  };
  useEffect(() => {
    if (!jobOffers) {
      handleGetAllPosts();
    }
  }, [jobOffers]);
  return { jobOffers };
};

export default JobOffersPageLogic;
