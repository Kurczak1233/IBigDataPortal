import EditFileComponent from "components/ArticlesComponents/ArticlesFiles/EditFileComponent/EditFileComponent";
import EditJobOffer from "components/ArticlesComponents/Edit/EditJobOffer/EditJobOffer";
import JobOffersHeader from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersHeader/JobOffersHeader";
import JobOfferItem from "components/ArticlesComponents/Overview/JobOffersPage/JobOffersItems/JobOfferItem/JobOfferItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EditJobOfferPage.module.scss";
import EditJobOfferPageLogic from "./EditJobOfferPageLogic";

const EditJobOfferPage = () => {
  const { state, jobOfferFiles, setJobOfferFiles } = EditJobOfferPageLogic();

  return (
    <div>
      <AdministartionPageHeader pageTitle={"Edit job offer"} />
      <JobOffersHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
      <JobOfferItem
        jobOffer={state}
        jobOfferColor={AvailableIntensiveColors.LessIntensiveBlue}
        interactive={false}
      />
      <div className={styles.formsContainer}>
        <div className={styles.formWrapper}>
          <EditJobOffer
            jobOffer={state}
            jobOfferFiles={jobOfferFiles.map((item) => item.file)}
          />
        </div>
        <EditFileComponent
          setPostsFiles={setJobOfferFiles}
          postFiles={jobOfferFiles}
          module={FileModuleEnum.jobOffersFiles}
        />
      </div>
    </div>
  );
};

export default EditJobOfferPage;
