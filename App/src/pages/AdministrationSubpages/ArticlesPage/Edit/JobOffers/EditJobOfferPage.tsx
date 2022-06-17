import EditJobOffer from "components/ArticlesComponents/Edit/EditJobOffer/EditJobOffer";
import JobOffersHeader from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersHeader/JobOffersHeader";
import JobOfferItem from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersItems/JobOfferItem/JobOfferItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useLocation } from "react-router-dom";

const EditJobOfferPage = () => {
  const location = useLocation();
  const state = location.state as JobOfferViewModel;
  return (
    <div>
      <AdministartionPageHeader pageTitle={"Edit job offer"} />
      <JobOffersHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
      <JobOfferItem
        jobOffer={state}
        jobOfferColor={AvailableIntensiveColors.LessIntensiveBlue}
        interactive={false}
      />
      <EditJobOffer jobOffer={state} />
    </div>
  );
};

export default EditJobOfferPage;
