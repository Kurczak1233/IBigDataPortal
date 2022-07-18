import styles from "./NavigationItem.module.scss";
import NavigationItemLogic from "./NavigationItemLogic";

interface INavigationItem {
  activeRouteImgSrc: string;
  nonActiveRouteImgSrc: string;
  alt: string;
  isActive: boolean;
  routeUrl: string;
  showAmountOfInvitations?: boolean;
}

const NavigationItem = ({
  activeRouteImgSrc,
  nonActiveRouteImgSrc,
  alt,
  isActive,
  routeUrl,
  showAmountOfInvitations,
}: INavigationItem) => {
  const { clickedOnNavigationItem, cooperationsCount } = NavigationItemLogic();
  return (
    <div
      className={styles.navigationItem}
      onClick={() => clickedOnNavigationItem(routeUrl)}
    >
      <img
        src={isActive ? activeRouteImgSrc : nonActiveRouteImgSrc}
        alt={alt}
      />
      {showAmountOfInvitations && cooperationsCount > 0 && (
        <div className={styles.notificationAmount}>
          <div className={styles.innerNumber}>{cooperationsCount}</div>
        </div>
      )}
    </div>
  );
};

export default NavigationItem;
