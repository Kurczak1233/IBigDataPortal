import styles from "./AdminMenuMobileHeader.module.scss";
import Logo from "public/IBigWorldLogo.png";
import AdminMenuMobileHeaderLogic from "./AdminMenuMobileHeaderLogic";
import BurgerMenu from "public/MobileAppIcons/GreenBurgerMenu.svg";

const AdminMenuMobileHeader = () => {
  const { naviagteToHome, handleDropdownOpen, isDropdownOpen } =
    AdminMenuMobileHeaderLogic();
  return (
    <header className={styles.mobileHeader}>
      <img src={Logo} height={80} alt={"Logo"} onClick={naviagteToHome} />
      <div className={styles.image}>
        <img
          onClick={handleDropdownOpen}
          src={BurgerMenu}
          height={30}
          alt={"Burger menu"}
        />
        {isDropdownOpen && <div>Hello motherfu</div>}
      </div>
    </header>
  );
};

export default AdminMenuMobileHeader;
