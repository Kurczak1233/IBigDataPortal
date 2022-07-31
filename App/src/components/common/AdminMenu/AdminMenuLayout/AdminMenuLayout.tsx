import styles from "./AdminMenuLayout.module.scss";
import LogOutIcon from "public/LogOutIcon.svg";
import AdminMenuLayoutLogic from "./AdminMenuLayoutLogic";
import { Outlet } from "react-router-dom";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import AdminMenuMobileHeader from "../AdminMenuMobileHeader/AdminMenuMobileHeader";
interface IAdminMenuLayout {
  menuContent: JSX.Element;
}

const AdminMenuLayout = ({ menuContent }: IAdminMenuLayout) => {
  const { handleLogout, navigateToMainPage, isTablet, isMobile } =
    AdminMenuLayoutLogic();
  return (
    <div className={styles.siteLayout}>
      {!(isTablet || isMobile) ? (
        <div className={styles.menu}>
          <div className={styles.menuWrapper}>
            {menuContent}
            <div>
              <SmallButton
                text={"Main page"}
                onClick={navigateToMainPage}
                color={AvailableIntensiveColors.IntensiveGreen}
                marginBottom={"16px"}
              />
              <div className={styles.menuBottom} onClick={handleLogout}>
                <div className={styles.logOutButton}>
                  <img src={LogOutIcon} alt={"Log out icon"} />
                </div>
                <span className={styles.logOutButtonText}>Log out</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AdminMenuMobileHeader />
      )}
      <div className={styles.contentLayout}>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminMenuLayout;
