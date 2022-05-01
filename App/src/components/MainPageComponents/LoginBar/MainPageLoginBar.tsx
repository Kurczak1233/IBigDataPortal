import { useAuth0 } from "@auth0/auth0-react";
import SmallButton from "../../common/Buttons/SmallButtons/SmallButton";
import styles from "./MainPageLoginBar.module.scss";
import MainPageLoginBarLogic from "./MainPageLoginBarLogic";

const MainPageLoginBar = () => {
  const { user } = useAuth0();
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
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
              marginRight={16}
              onClick={handleMoveToThePortal}
            />
            <SmallButton text="Log out" onClick={handleLogOut} />
          </>
        ) : (
          <>
            <SmallButton
              text={"Log in"}
              marginRight={16}
              onClick={handleClickOnLogin}
            />
            <SmallButton text={"Register"} onClick={handleClickOnRegister} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainPageLoginBar;
