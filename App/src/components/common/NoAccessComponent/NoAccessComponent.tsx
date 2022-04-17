import styles from "./NoAccessComponent.module.scss";
import ShieldWithLockIcon from "public/ShieldWithLockIcon.svg";
import BigButton from "../Buttons/BigButtons/BigButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import NoAccessComponentLogic from "./NoAccessComponentLogic";

const NoAccessComponent = () => {
  const { handleReturnButtonClick } = NoAccessComponentLogic();

  return (
    <>
      <div className={styles.noAccessHalfUpperPartWrapper}>
        <div className={styles.textBox}>
          <div className={styles.firstChild}>You should not pass</div>
          <div className={styles.lastChild}>
            You have no access to this page
          </div>
        </div>
      </div>
      <div className={styles.noAccessHalfLowerPartWrapper}>
        <div className={styles.iconBox}>
          <img src={ShieldWithLockIcon} alt={"No access icon"} />
        </div>
        <BigButton
          onClick={handleReturnButtonClick}
          uppercase={true}
          text={"Return"}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
    </>
  );
};

export default NoAccessComponent;
