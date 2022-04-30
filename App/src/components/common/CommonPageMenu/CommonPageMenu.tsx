import styles from "./CommonPageMenu.module.scss";
import LogOutIcon from "public/LogOutIcon.svg";
import CommonPageMenuLogic from "./CommonPageMenuLogic";
interface ICommonPageMenu {
  menuContent: JSX.Element;
  content: JSX.Element;
}

const CommonPageMenu = ({ menuContent, content }: ICommonPageMenu) => {
  const { handleLogout } = CommonPageMenuLogic();
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
export default CommonPageMenu;
