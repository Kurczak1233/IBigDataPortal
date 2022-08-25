import {
  administrationRoute,
  articlesRoute,
  createJobOfferRoute,
} from "constants/apiRoutes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

const JobOfferContentLogic = () => {
  const filteredJobOffers = useSelector(
    (state: RootState) => state.articlesFiltersReducer.jobOffersFiltered
  );
  const [filtersSet, setFiltersSet] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToCreateJobOffer = () => {
    navigate(`/${administrationRoute}/${articlesRoute}/${createJobOfferRoute}`);
  };

  return {
    navigateToCreateJobOffer,
    filteredJobOffers,
    filtersSet,
    setFiltersSet,
  };
};
export default JobOfferContentLogic;
