import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./MobileInvitationsSubPages.module.scss";
import MobileInvitationsSubPagesLogic from "./MobileInvitationsSubPagesLogic";
const MobileInvitationsSubPages = () => {
  const {
    setActiveAsCurrent,
    setArchivedAsCurrent,
    isArchived,
    cooperationsCount,
  } = MobileInvitationsSubPagesLogic();
  return (
    <>
      <div
        style={{
          background: !isArchived
            ? `#${AvailableIntensiveColors.LessIntensiveOrange}`
            : `#${AvailableIntensiveColors.ClearWhite}`,
        }}
        onClick={setActiveAsCurrent}
        className={styles.subNavigationItem}
      >
        Active ({cooperationsCount})
      </div>
      <div
        style={{
          background: isArchived
            ? `#${AvailableIntensiveColors.LessIntensiveOrange}`
            : `#${AvailableIntensiveColors.ClearWhite}`,
        }}
        onClick={setArchivedAsCurrent}
        className={styles.subNavigationItem}
      >
        Archived
      </div>
    </>
  );
};

export default MobileInvitationsSubPages;
