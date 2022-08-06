import styles from "./AdminMenuMobileHeader.module.scss";
import Logo from "public/IBigWorldLogo.png";
import AdminMenuMobileHeaderLogic from "./AdminMenuMobileHeaderLogic";
import BurgerMenu from "public/MobileAppIcons/GreenBurgerMenu.svg";
import MenuComponentTitle from "components/MainPageComponents/Main/Menu/MenuComponentTitle/MenuComponentTitle";
import MobileNavigationItem from "./MobileNavigationItem/MobileNavigationItem";

const AdminMenuMobileHeader = () => {
  const {
    naviagteToHome,
    handleDropdownOpen,
    isDropdownOpen,
    administrationRoutes,
    dropdownRef,
    handleCloseDropdown,
  } = AdminMenuMobileHeaderLogic();

  return (
    <header className={styles.mobileHeader}>
      <img src={Logo} height={80} alt={"Logo"} onClick={naviagteToHome} />
      <div className={styles.image} ref={dropdownRef}>
        <img
          onClick={handleDropdownOpen}
          src={BurgerMenu}
          className={styles.burgerMenu}
          alt={"Burger menu"}
        />
        {isDropdownOpen && (
          <div className={styles.dropdownWrapper}>
            <MenuComponentTitle name={"Navigation"} />
            {administrationRoutes.map((item) => {
              return (
                item.hasPermissionsToView && (
                  <MobileNavigationItem
                    key={item.routeUrl}
                    item={item}
                    handleCloseDropdown={handleCloseDropdown}
                  />
                )
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminMenuMobileHeader;
