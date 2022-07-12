import BigButton from "components/common/Buttons/BigButtons/BigButton";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./PrivacyPage.module.scss";
import PrivacyPageLogic from "./PrivacyPageLogic";
import ATHLogo from "public/ATHLogo.png";

const PrivacyPage = () => {
  const { navigateToMainPage } = PrivacyPageLogic();
  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.main}>
          <div className={styles.title}>Privacy policy</div>
          <SeparationSmallBar marginBottom="12px" marginTop="12px" />
          <div className={styles.content}>
            <a href="https://www.ath.bielsko.pl/polityka-prywatnosci/">
              <div className={styles.privacyPolicy}>
                <div>Privacy policy</div>
                <img height={100} src={ATHLogo} alt={"ATH logo"} />
              </div>
            </a>
            <a href="https://www.ath.bielsko.pl/klauzula-informacyjna-rodo/">
              <div className={styles.privacyPolicy}>
                <div>GDPR</div>
                <img height={100} src={ATHLogo} alt={"ATH logo"} />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.returnButton}>
        <BigButton
          text={"Return"}
          color={AvailableIntensiveColors.IntensiveOrange}
          onClick={navigateToMainPage}
        />
      </div>
    </>
  );
};

export default PrivacyPage;
