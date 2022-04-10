import HeaderBanner from "public/HeaderBanner.png";
import styles from "./MainPageHeader.module.scss";

const MainPageHeader = () => {
  return (
    <div>
      <header className={styles.mainPageBanner}>
        <img src={HeaderBanner} alt={"Header banner"} />
      </header>
    </div>
  );
};

export default MainPageHeader;
