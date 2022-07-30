import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./EduLinksHeader.module.scss";
import EduLinksHeaderLogic from "./EduLinksHeaderLogic";

interface IEduLinksHeader {
  iconsColour: AvailableIntensiveColors;
}

const EduLinksHeader = ({ iconsColour }: IEduLinksHeader) => {
  const { getApppriateImagesColours, isTablet, isMobile } =
    EduLinksHeaderLogic();
  const icons = getApppriateImagesColours(iconsColour);
  return (
    <div className={styles.header}>
      <div className={styles.posted}>
        Posted
        <img
          className={styles.image}
          src={icons.calendarIcon}
          alt={"Calendar icon"}
        />
      </div>
      <div className={styles.title}>
        Title
        <img
          className={styles.image}
          src={icons.featherIcon}
          alt={"Feather icon"}
        />
      </div>
      {!(isTablet || isMobile) && (
        <div className={styles.creator}>
          Creator
          <img
            className={styles.image}
            src={icons.lampIcon}
            alt={"Lamp icon"}
          />
        </div>
      )}
      <div className={styles.emptyButtonSpace} />
    </div>
  );
};

export default EduLinksHeader;
