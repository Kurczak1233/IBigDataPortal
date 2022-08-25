import EditEduLink from "components/ArticlesComponents/Edit/EditEduLink/EditEduLink";
import EduLinksHeader from "components/ArticlesComponents/Overview/EduLinksPage/EduLinksHeader/EduLinksHeader";
import EduLinkItem from "components/ArticlesComponents/Overview/EduLinksPage/EduLinksItems/EduLinkItem/EduLinkItem";
import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EditEduLinkPage.module.scss";
import EditEduLinkPageLogic from "./EditEduLinkPageLogic";

const EditEduLinkPage = () => {
  const { state, eduLinkFiles, setEduLinkFiles } = EditEduLinkPageLogic();

  return (
    <div className={styles.pageLayout}>
      <AdministartionPageHeader pageTitle={"Edit edu link"} />
      <EduLinksHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
      <EduLinkItem
        eduLink={state}
        eduLinkColor={AvailableIntensiveColors.LessIntensiveGreen}
        interactive={false}
      />
      <div className={styles.formWrapper}>
        <EditEduLink
          eduLink={state}
          eduLinkFiles={eduLinkFiles.map((item) => item.file)}
          postFilesWithMetadata={eduLinkFiles}
          setEduLinkFiles={setEduLinkFiles}
        />
      </div>
    </div>
  );
};

export default EditEduLinkPage;
