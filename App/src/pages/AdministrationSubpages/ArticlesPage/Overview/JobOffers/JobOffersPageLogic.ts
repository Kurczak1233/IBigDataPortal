import { getAllJobOffers } from "api/JobOffersClient";
import { compareAsc } from "date-fns";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useState, useEffect } from "react";

const JobOffersPageLogic = () => {
  const [jobOffers, setJobOffers] = useState<JobOfferViewModel[]>();
  const handleGetAllJobOffers = async () => {
    const result = await getAllJobOffers();
    setJobOffers(
      result.sort((item, secondItem) =>
        compareAsc(new Date(secondItem.posted), new Date(item.posted))
      )
    );
  };
  useEffect(() => {
    if (!jobOffers) {
      handleGetAllJobOffers();
    }
  }, [jobOffers]);
  return { jobOffers, setJobOffers };
};

export default JobOffersPageLogic;
