import AdminMenuHeaderLogic from "./AdminMenuHeaderLogic";
import styles from "./AdminMenuHeader.module.scss";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";

const AdminMenuHeader = () => {
  const { applicationUser } = AdminMenuHeaderLogic();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerTitle}>Admin panel</div>
      <div className={styles.currentUser}>{applicationUser?.email}</div>
      <SeparationSmallBar marginTop="16px" />
    </div>
  );
};
export default AdminMenuHeader;
