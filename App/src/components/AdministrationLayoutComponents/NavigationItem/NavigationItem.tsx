import styles from "./NavigationItem.module.scss";
import NavigationItemLogic from "./NavigationItemLogic";

interface INavigationItem {
  activeRouteImgSrc: string;
  nonActiveRouteImgSrc: string;
  alt: string;
  isActive: boolean;
  routeUrl: string;
}

const NavigationItem = ({
  activeRouteImgSrc,
  nonActiveRouteImgSrc,
  alt,
  isActive,
  routeUrl,
}: INavigationItem) => {
  const { clickedOnNavigationItem } = NavigationItemLogic();
  return (
    <div
      className={styles.navigationItem}
      onClick={() => clickedOnNavigationItem(routeUrl)}
    >
      <img
        src={isActive ? activeRouteImgSrc : nonActiveRouteImgSrc}
        alt={alt}
      />
    </div>
  );
};

export default NavigationItem;
