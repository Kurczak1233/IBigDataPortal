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
  const { clickedOnNavigationItem, amountOfActiveCooperations } =
    NavigationItemLogic();
  return (
    <div
      className={styles.navigationItem}
      onClick={() => clickedOnNavigationItem(routeUrl)}
    >
      <img
        src={isActive ? activeRouteImgSrc : nonActiveRouteImgSrc}
        alt={alt}
      />
      {showAmountOfInvitations && (
        <div className={styles.notificationAmount}>
          <div className={styles.innerNumber}>{amountOfActiveCooperations}</div>
        </div>
      )}
    </div>
  );
};

export default NavigationItem;
