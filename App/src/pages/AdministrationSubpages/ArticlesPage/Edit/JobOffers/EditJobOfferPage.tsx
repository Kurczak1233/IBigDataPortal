import EditJobOffer from "components/ArticlesComponents/Edit/EditJobOffer/EditJobOffer";
import JobOffersHeader from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersHeader/JobOffersHeader";
import JobOfferItem from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersItems/JobOfferItem/JobOfferItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EditJobOfferPage.module.scss";
import EditJobOfferPageLogic from "./EditJobOfferPageLogic";

const EditJobOfferPage = () => {
  const { state, jobOfferFiles, setJobOfferFiles } = EditJobOfferPageLogic();

  return (
    <div className={styles.pageLayout}>
      <AdministartionPageHeader pageTitle={"Edit job offer"} />
      <JobOffersHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
      <JobOfferItem
        jobOffer={state}
        jobOfferColor={AvailableIntensiveColors.LessIntensiveBlue}
        interactive={false}
      />
      <div className={styles.formWrapper}>
        <EditJobOffer
          jobOffer={state}
          jobOfferFiles={jobOfferFiles.map((item) => item.file)}
          postFilesWithMetadata={jobOfferFiles}
          setJobOfferFiles={setJobOfferFiles}
        />
      </div>
    </div>
  );
};

export default EditJobOfferPage;
