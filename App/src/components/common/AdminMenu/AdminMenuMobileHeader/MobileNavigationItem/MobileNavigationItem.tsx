import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { IAdministrationRoute } from "../AdminMenuMobileHeaderLogic";
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
        <div>
          <div className={styles.subNavigationTitle}>
            {adminMenuNavigationOverviewContents.sectionName}
          </div>
          {adminMenuNavigationOverviewContents.items.map((subItem) => {
            return (
              <div
                style={{
                  background: subItem.isActive
                    ? `#${AvailableIntensiveColors.LessIntensiveOrange}`
                    : `#${AvailableIntensiveColors.ClearWhite}`,
                }}
                key={subItem.switchTo}
                onClick={() => navigateToArticlesSubPage(subItem.switchTo)}
                className={styles.subNavigationItem}
              >
                {subItem.itemName}
              </div>
            );
          })}
          <div className={styles.subNavigationTitle}>
            {adminMenuNavigationCreateContents.sectionName}
          </div>
          {adminMenuNavigationCreateContents.items.map((subItem) => {
            return (
              <div
                style={{
                  background: subItem.isActive
                    ? `#${AvailableIntensiveColors.LessIntensiveOrange}`
                    : `#${AvailableIntensiveColors.ClearWhite}`,
                }}
                key={subItem.switchTo}
                onClick={() => navigateToArticlesSubPage(subItem.switchTo)}
                className={styles.subNavigationItem}
              >
                {subItem.itemName}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MobileNavigationItem;
