import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import SmallButton from "../../common/Buttons/SmallButtons/SmallButton";
import styles from "./MainPageLoginBar.module.scss";
import MainPageLoginBarLogic from "./MainPageLoginBarLogic";

const MainPageLoginBar = () => {
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    user,
  } = MainPageLoginBarLogic();

  return (
    <div className={styles.barWrapper}>
      <div>LOGO</div>
      <div>search input</div>
      <div className={styles.barButtonsWrapper}>
        {user ? (
          <>
            <SmallButton
              text="Portal"
              onClick={handleMoveToThePortal}
              color={AvailableIntensiveColors.IntensiveGreen}
            />
            <SmallButton
              text="Log out"
              onClick={handleLogOut}
              color={AvailableIntensiveColors.IntensiveGreen}
            />
          </>
        ) : (
          <>
            <SmallButton
              text={"Log in"}
              onClick={handleClickOnLogin}
              color={AvailableIntensiveColors.IntensiveGreen}
            />
            <SmallButton
              text={"Register"}
              onClick={handleClickOnRegister}
              color={AvailableIntensiveColors.IntensiveGreen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPageLoginBar;
