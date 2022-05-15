import AdminMenuHeaderLogic from "./AdminMenuHeaderLogic";
import styles from "./AdminMenuHeader.module.scss";
import SeparationBar from "components/common/SeparationBar/SeparationBar";

const AdminMenuHeader = () => {
  const { applicationUser } = AdminMenuHeaderLogic();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerTitle}>Admin panel</div>
      <div className={styles.currentUser}>{applicationUser?.email}</div>
      <SeparationBar marginTop="16px" />
    </div>
  );
};
export default AdminMenuHeader;
