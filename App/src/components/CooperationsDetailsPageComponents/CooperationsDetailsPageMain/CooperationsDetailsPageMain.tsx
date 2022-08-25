import CooperationsPageHeader from "components/CooperationsPageComponents/CooperationsPageHeader/CooperationsPageHeader";
import CooperationsPageItem from "components/CooperationsPageComponents/CooperationsPageMainItem/CooperationsPageItem";
import CooperationsDetailsPageMainLogic from "./CooperationsDetailsPageMainLogic";
import styles from "./CooperationsDetailsPageMain.module.scss";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { format } from "date-fns";
import { standarizedFormat } from "constants/dateFormats";

const CooperationsDetailsPageMain = () => {
  const { selectedCooperation, returnBack, isMobile } =
    CooperationsDetailsPageMainLogic();

  if (!selectedCooperation) {
    return <div />;
  }
  return (
    <div>
      <CooperationsPageHeader />
      <div className={styles.separationBar} />
      <CooperationsPageItem
        cooperation={selectedCooperation}
        archived={selectedCooperation?.isArchived}
        clickActive={false}
      />
      {isMobile && (
        <>
          <div className={styles.header}>Created on</div>
          <div className={styles.createdOn}>
            {format(new Date(selectedCooperation.createdOn), standarizedFormat)}
          </div>
        </>
      )}
      <div className={styles.header}>Description</div>
      <div className={styles.description}>
        {selectedCooperation.description}
      </div>
      <SmallButton
        text={"Return"}
        marginTop={"32px"}
        onClick={returnBack}
        color={AvailableIntensiveColors.IntensiveGreen}
      />
    </div>
  );
};

export default CooperationsDetailsPageMain;
