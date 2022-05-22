import { getAllJobOffers } from "api/JobOffersClient";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useState, useEffect } from "react";

const JobOffersPageLogic = () => {
  const [jobOffers, setJobOffers] = useState<JobOfferViewModel[]>();
  const handleGetAllJobOffers = async () => {
    setJobOffers(await getAllJobOffers());
  };
  useEffect(() => {
    if (!jobOffers) {
      handleGetAllJobOffers();
    }
  }, [jobOffers]);
  return { jobOffers };
};

export default JobOffersPageLogic;
