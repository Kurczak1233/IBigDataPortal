import { getAllJobOffers } from "api/JobOffersClient";
import { compareAsc } from "date-fns";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeJobOffersFilters } from "redux/slices/articlesFiltersSlice";

const JobOffersPageLogic = () => {
  const [jobOffers, setJobOffers] = useState<JobOfferViewModel[]>();
  const dispatch = useDispatch();
  const handleGetAllJobOffers = useCallback(async () => {
    const result = await getAllJobOffers();
    const sortingResult = result.sort((item, secondItem) =>
      compareAsc(new Date(secondItem.posted), new Date(item.posted))
    );
    setJobOffers(sortingResult);
    dispatch(initializeJobOffersFilters(sortingResult));
  }, [dispatch]);
  useEffect(() => {
    if (!jobOffers) {
      handleGetAllJobOffers();
    }
  }, [handleGetAllJobOffers, jobOffers]);
  return { jobOffers, setJobOffers };
};

export default JobOffersPageLogic;
