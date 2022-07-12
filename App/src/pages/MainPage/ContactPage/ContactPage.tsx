import BigButton from "components/common/Buttons/BigButtons/BigButton";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./ContactPage.module.scss";
import ContactPageLogic from "./ContactPageLogic";

const ContactPage = () => {
  const { navigateToMainPage } = ContactPageLogic();
  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.main}>
          <div className={styles.title}>Contact</div>
          <SeparationSmallBar marginBottom="12px" marginTop="12px" />
          <div className={styles.content}>
            <div className={styles.contactEmail}>Email:</div>
            <a href="mailto:erasmusibigdata@ath.edu.pl">
              erasmusibigdata@ath.edu.pl
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
export default ContactPage;
