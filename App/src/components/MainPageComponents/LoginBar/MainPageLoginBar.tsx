import { getChecklistsFormTemplates } from "api/UsersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/ToastModes";
import SmallButton from "../../common/Buttons/SmallButtons/SmallButton";
import styles from "./MainPageLoginBar.module.scss";
import MainPageLoginBarLogic from "./MainPageLoginBarLogic";

const MainPageLoginBar = () => {
  const { handleClickOnLogin, handleClickOnRegister } = MainPageLoginBarLogic();
  SyncToast({ mode: ToastModes.Success, description: "Test description" });
  const handleClick = () => {
    getChecklistsFormTemplates();
  };
  return (
    <div className={styles.barWrapper}>
      <div
        onClick={() => {
          handleClick();
        }}
      >
        LOGO
      </div>
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
