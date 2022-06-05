import EditEduLink from "components/ArticlesComponents/Edit/EditEduLink/EditEduLink";
import EduLinksHeader from "components/ArticlesComponents/Overview/EduLinksPage/EduLinksHeader/EduLinksHeader";
import EduLinkItem from "components/ArticlesComponents/Overview/EduLinksPage/EduLinksItems/EduLinkItem/EduLinkItem";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import { useLocation } from "react-router-dom";
import styles from "./EditEduLinkPage.module.scss";

const EditEduLinkPage = () => {
  const location = useLocation();
  const state = location.state as EduLinkViewModel;
  return (
    <div>
      <div className={styles.title}>Edit edu link</div>
      <EduLinksHeader iconsColour={AvailableIntensiveColors.IntensiveBlue} />
      <EduLinkItem
        eduLink={state}
        eduLinkColor={AvailableIntensiveColors.LessIntensiveGreen}
        interactive={false}
      />
      <EditEduLink eduLink={state} />
    </div>
  );
};

export default EditEduLinkPage;
