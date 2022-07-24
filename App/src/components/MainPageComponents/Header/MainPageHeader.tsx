import HeaderBanner from "public/HeaderBanner.png";
import styles from "./MainPageHeader.module.scss";
import MainPageHeaderLogic from "./MainPageHeaderLogic";
import Logo from "public/IBigWorldLogo.png";
import BurgerMenu from "public/MobileAppIcons/GreenBurgerMenu.svg";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import MenuComponentTitle from "../Main/Menu/MenuComponentTitle/MenuComponentTitle";
const MainPageHeader = () => {
  const {
    isMobile,
    handleDropdownOpen,
    isDropdownOpen,
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    hasAccessToPortal,
    dropdownRef,
    navigateToRoleRequest,
  } = MainPageHeaderLogic();

  return (
    <div>
      {!isMobile ? (
        <header className={styles.mainPageBanner}>
          <img src={HeaderBanner} alt={"Header banner"} />
        </header>
      ) : (
        <div className={styles.mobileHeader}>
          <img src={Logo} height={80} alt={"Logo"} />
          <div className={styles.image}>
            <img
              onClick={handleDropdownOpen}
              src={BurgerMenu}
              height={30}
              alt={"Burger menu"}
            />
            {isDropdownOpen && (
              <div className={styles.dropdown} ref={dropdownRef}>
                {appUser ? (
                  <>
                    <MenuComponentTitle name={"Current user"} />
                    <div>
                      <div className={styles.logged}>
                        You are logged in as a
                      </div>
                      <div className={styles.loggedAs}>{appUser?.email}</div>
                    </div>
                    <div className={styles.buttons}>
                      {hasAccessToPortal && (
                        <SmallButton
                          text="Portal"
                          width="45%"
                          onClick={handleMoveToThePortal}
                          color={AvailableIntensiveColors.IntensiveGreen}
                        />
                      )}
                      <SmallButton
                        text="Log out"
                        onClick={handleLogOut}
                        width="45%"
                        color={AvailableIntensiveColors.IntensiveRed}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <MenuComponentTitle name={"Current user"} />
                    <div className={styles.logged}>
                      You are currently not logged in
                    </div>
                    <div className={styles.buttons}>
                      <SmallButton
                        width="45%"
                        text={"Log in"}
                        onClick={handleClickOnLogin}
                        color={AvailableIntensiveColors.IntensiveGreen}
                      />
                      <SmallButton
                        width="45%"
                        text={"Register"}
                        onClick={handleClickOnRegister}
                        color={AvailableIntensiveColors.IntensiveGreen}
                      />
                    </div>
                  </>
                )}
                <MenuComponentTitle name={"Interactions"} marginTop={"16px"} />
                <div className={styles.requestRole}>
                  <div>Request a role:</div>
                  <SmallButton
                    text={"Request"}
                    onClick={navigateToRoleRequest}
                    width={"40%"}
                    color={AvailableIntensiveColors.IntensiveBlue}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPageHeader;
