import NavigationItem from "components/AdministrationLayoutComponents/NavigationItem/NavigationItem";
import { Outlet } from "react-router-dom";
import styles from "./AdministrationLayout.module.scss";
import AdministrationLayoutLogic from "./AdministrationLayoutLogic";

const AdministrationLayout = () => {
  const { administrationRoutes, isTablet, isMobile } =
    AdministrationLayoutLogic();
  return (
    <>
      {!(isTablet || isMobile) ? (
        <div className={styles.administrationLayoutWrapper}>
          <div className={styles.navigationLayout}>
            {administrationRoutes.map((item) => {
              return (
                item.hasPermissionsToView && (
                  <NavigationItem
                    key={item.routeUrl}
                    activeRouteImgSrc={item.imgActive}
                    nonActiveRouteImgSrc={item.imgNonActive}
                    alt={item.alt}
                    routeUrl={item.routeUrl}
                    isActive={item.isActive}
                    showAmountOfInvitations={item.showAmountOfInvitations}
                  />
                )
              );
            })}
          </div>
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AdministrationLayout;
