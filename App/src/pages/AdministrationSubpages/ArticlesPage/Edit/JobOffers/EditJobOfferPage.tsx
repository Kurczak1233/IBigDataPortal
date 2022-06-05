import EditJobOffer from "components/ArticlesComponents/Edit/EditJobOffer/EditJobOffer";
import JobOffersHeader from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersHeader/JobOffersHeader";
import JobOfferItem from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersItems/JobOfferItem/JobOfferItem";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { JobOfferViewModel } from "interfaces/Models/JobOffers/ViewModels/JobOfferViewModel";
import { useLocation } from "react-router-dom";
import styles from "./EditJobOfferPage.module.scss";

const EditJobOfferPage = () => {
  const location = useLocation();
  const state = location.state as JobOfferViewModel;
  return (
    <div>
      <div className={styles.title}>Edit job offer</div>
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
