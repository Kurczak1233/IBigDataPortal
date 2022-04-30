import NavigationItem from "components/AdministrationLayoutComponents/NavigationItem/NavigationItem";
import { Outlet } from "react-router-dom";
import styles from "./AdministrationLayout.module.scss";
import AdministrationLayoutLogic from "./AdministrationLayoutLogic";

const AdministrationLayout = () => {
  const { administrationRoutes, pathname } = AdministrationLayoutLogic();
  return (
    <div className={styles.administrationLayoutWrapper}>
      <div className={styles.navigationLayout}>
        {administrationRoutes.map((item) => (
          <NavigationItem
            key={item.routeUrl}
            activeRouteImgSrc={item.imgActive}
            nonActiveRouteImgSrc={item.imgNonActive}
            alt={item.alt}
            routeUrl={item.routeUrl}
            isActive={pathname === item.routeUrl}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default AdministrationLayout;
