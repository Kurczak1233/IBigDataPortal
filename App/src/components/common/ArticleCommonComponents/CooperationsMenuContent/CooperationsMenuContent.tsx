import AdminMenuHeader from "components/common/AdminMenu/AdminMenuHeader/AdminMenuHeader";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./CooperationsMenuContent.module.scss";
import CooperationsMenuContentLogic from "./CooperationsMenuContentLogic";

const CooperationsMenuContent = () => {
  const { setArchivedAsCurrent, setActiveAsCurrent, isArchived } =
    CooperationsMenuContentLogic();
  return (
    <div className={styles.menuItemsGenerator}>
      <AdminMenuHeader />
      <SmallButton
        marginTop="32px"
        text={"Active"}
        onClick={setActiveAsCurrent}
        color={
          isArchived
            ? AvailableIntensiveColors.InactiveGray
            : AvailableIntensiveColors.IntensiveOrange
        }
      />
      <SmallButton
        marginTop="16px"
        text={"Archived"}
        onClick={setArchivedAsCurrent}
        color={
          isArchived
            ? AvailableIntensiveColors.IntensiveOrange
            : AvailableIntensiveColors.InactiveGray
        }
      />
    </div>
  );
};

export default CooperationsMenuContent;
