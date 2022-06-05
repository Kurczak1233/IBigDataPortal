import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useLocation } from "react-router-dom";

const EditJobOfferPage = () => {
  const location = useLocation();
  const state = location.state as JobOfferViewModel;
  return <div>{state.id}</div>;
};

export default EditJobOfferPage;
