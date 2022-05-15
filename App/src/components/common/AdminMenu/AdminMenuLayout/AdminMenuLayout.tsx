import styles from "./AdminMenuLayout.module.scss";
import LogOutIcon from "public/LogOutIcon.svg";
import AdminMenuLayoutLogic from "./AdminMenuLayoutLogic";
interface IAdminMenuLayout {
  menuContent: JSX.Element;
  content: JSX.Element;
}

const AdminMenuLayout = ({ menuContent, content }: IAdminMenuLayout) => {
  const { handleLogout } = AdminMenuLayoutLogic();
  return (
    <div className={styles.siteLayout}>
      <div className={styles.menu}>
        <div className={styles.menuWrapper}>
          {menuContent}
          <div className={styles.menuBottom} onClick={handleLogout}>
            <div className={styles.logOutButton}>
              <img src={LogOutIcon} alt={"Log out icon"} />
            </div>
            <span className={styles.logOutButtonText}>Log out</span>
          </div>
        </div>
      </div>
      <div className={styles.contentLayout}>{content}</div>
    </div>
  );
};
export default AdminMenuLayout;
