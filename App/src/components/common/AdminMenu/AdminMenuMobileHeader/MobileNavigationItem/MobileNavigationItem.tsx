import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { IAdministrationRoute } from "../AdminMenuMobileHeaderLogic";
import MobileArticlesSubPages from "./MobileArticlesSubPages/MobileArticlesSubPages";
import MobileInvitationsSubPagesLogic from "./MobileInvitationsSubPages/MobileInvitationsSubPages";
import styles from "./MobileNavigationItem.module.scss";
import MobileNavigationItemLogic from "./MobileNavigationItemLogic";

interface IMobileNavigationItem {
  item: IAdministrationRoute;
  handleCloseDropdown: () => void;
}

const MobileNavigationItem = ({
  item,
  handleCloseDropdown,
}: IMobileNavigationItem) => {
  const {
    navigateToItem,
    adminMenuNavigationCreateContents,
    adminMenuNavigationOverviewContents,
    navigateToArticlesSubPage,
  } = MobileNavigationItemLogic(item, handleCloseDropdown);
  return (
    <>
      <div
        onClick={navigateToItem}
        className={styles.navigationItem}
        style={{
          backgroundColor: item.isActive
            ? `#${AvailableIntensiveColors.LessIntensiveOrange}`
            : `white`,
        }}
      >
        <div className={styles.image}>
          <img
            src={item.isActive ? item.imgActive : item.imgNonActive}
            alt={"Route icon"}
          />
        </div>
        {item.routeName}
      </div>
      {item.routeName === "Articles" && item.isActive && (
        <MobileArticlesSubPages
          adminMenuNavigationCreateContents={adminMenuNavigationCreateContents}
          adminMenuNavigationOverviewContents={
            adminMenuNavigationOverviewContents
          }
          navigateToArticlesSubPage={navigateToArticlesSubPage}
        />
      )}
      {item.routeName === "Invitations" && item.isActive && (
        <MobileInvitationsSubPagesLogic />
      )}
    </>
  );
};

export default MobileNavigationItem;
