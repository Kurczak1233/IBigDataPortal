import styles from "./CooperationsPageHeader.module.scss";
import GreenCalendarIcon from "public/GreenCalendarIcon.svg";
import GreenEmailIcon from "public/GreenEmailIcon.svg";

const CooperationsPageHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.creatorEmail}>
        Creator email
        <img className={styles.image} src={GreenEmailIcon} alt={"Email icon"} />
      </div>
      <div className={styles.createdOn}>
        Created on
        <img
          className={styles.image}
          src={GreenCalendarIcon}
          alt={"Calednar icon"}
        />
      </div>
    </div>
  );
};

export default CooperationsPageHeader;
