import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import BigLoader from "components/common/Loaders/BigLoader";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./Menu.module.scss";
import MenuLogic from "./MenuLogic";
import MenuTitle from "./MenuTitle/MenuTitle";

const Menu = () => {
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    isLoading,
    applicationUser,
  } = MenuLogic();
  if (isLoading) {
    return <BigLoader />;
  }
  return (
    <aside className={styles.menuSite}>
      <div className={styles.headerTitle}>Menu</div>
      <div className={styles.menu}>
        <MenuTitle name={"Personal info"} />
        <section className={styles.userSection}>
          {applicationUser ? (
            <>
              <div>
                <div>You are logged in as a</div>
                <div className={styles.loggedAs}>{applicationUser?.email}</div>
              </div>
              <div className={styles.buttons}>
                <SmallButton
                  text="Portal"
                  width="45%"
                  onClick={handleMoveToThePortal}
                  color={AvailableIntensiveColors.IntensiveGreen}
                />
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
              <div>You are currently not logged in</div>
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
        </section>
      </div>
    </aside>
  );
};

export default Menu;
