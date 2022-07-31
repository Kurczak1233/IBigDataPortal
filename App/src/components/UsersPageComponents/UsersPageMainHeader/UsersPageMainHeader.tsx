import styles from "./UsersPageMainHeader.module.scss";
import GreenFeatherIcon from "public/PostsIcons/GreenFeatherIcon.svg";
import GreenShieldIcon from "public/GreenShieldIcon.svg";
import GreenEmailIcon from "public/GreenEmailIcon.svg";
import { UsersPageMainHeaderLogic } from "./UsersPageMainHeaderLogic";

const UsersPageMainHeader = () => {
  const { isMobile, isTablet } = UsersPageMainHeaderLogic();
  return (
    <div className={styles.header}>
      <div className={styles.nickname}>
        Nickname
        <img
          className={styles.image}
          src={GreenFeatherIcon}
          alt={"Name icon"}
        />
      </div>
      <div className={styles.email}>
        Email
        <img className={styles.image} src={GreenEmailIcon} alt={"Email icon"} />
      </div>
      {!(isMobile || isTablet) ? (
        <div className={styles.role}>
          Role
          <img
            className={styles.image}
            src={GreenShieldIcon}
            alt={"Permission icon"}
          />
        </div>
      ) : (
        <div className={styles.rolePlace} />
      )}
    </div>
  );
};

export default UsersPageMainHeader;
