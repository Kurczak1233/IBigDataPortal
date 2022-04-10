import SmallButton from "../../common/Buttons/SmallButtons/SmallButton";
import styles from "./MainPageLoginBar.module.scss";
import MainPageLoginBarLogic from "./MainPageLoginBarLogic";

const MainPageLoginBar = () => {
  const { handleClickOnLogin, handleClickOnRegister } = MainPageLoginBarLogic();
  return (
    <div className={styles.barWrapper}>
      <div>LOGO</div>
      <div>search input</div>
      <div className={styles.barButtonsWrapper}>
        <SmallButton
          text={"Log in"}
          marginRight={16}
          onClick={handleClickOnLogin}
        />
        <SmallButton text={"Register"} onClick={handleClickOnRegister} />
      </div>
    </div>
  );
};

export default MainPageLoginBar;
