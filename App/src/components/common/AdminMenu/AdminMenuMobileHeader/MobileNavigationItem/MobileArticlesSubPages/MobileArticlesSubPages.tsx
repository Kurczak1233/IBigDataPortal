import { IAdminMenuContentArray } from "components/common/AdminMenu/AdminMenuContentGenerator/Interfaces/IAdminMenuContentArray";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./MobileArticlesSubPages.module.scss";

interface IMobileArticlesSubPages {
  adminMenuNavigationCreateContents: IAdminMenuContentArray;
  adminMenuNavigationOverviewContents: IAdminMenuContentArray;
  navigateToArticlesSubPage: (url: string) => void;
}

const MobileArticlesSubPages = ({
  adminMenuNavigationCreateContents,
  adminMenuNavigationOverviewContents,
  navigateToArticlesSubPage,
}: IMobileArticlesSubPages) => {
  return (
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
  );
};

export default MobileArticlesSubPages;
