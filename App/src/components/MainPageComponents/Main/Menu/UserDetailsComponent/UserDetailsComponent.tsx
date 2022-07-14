import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import MenuComponentTitle from "../MenuComponentTitle/MenuComponentTitle";
import UserDetailsComponentLogic from "./UserDetailsComponentLogic";
import styles from "./UserDetailsComponent.module.scss";

const UserDetailsComponent = () => {
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    applicationUser,
    hasAccessToPortal,
  } = UserDetailsComponentLogic();
  return (
    <section className={styles.menu}>
      <MenuComponentTitle name={"Personal info"} />
      <main className={styles.userSection}>
        {applicationUser ? (
          <>
            <div>
              <div>You are logged in as a</div>
              <div className={styles.loggedAs}>{applicationUser?.email}</div>
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
      </main>
    </section>
  );
};

export default UserDetailsComponent;
