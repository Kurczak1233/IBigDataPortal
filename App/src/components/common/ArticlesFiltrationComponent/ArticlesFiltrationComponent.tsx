import styles from "./ArticlesFiltrationComponent.module.scss";
import GreenFilterIcon from "public/GreenFilterIcon.svg";

const ArticlesFiltrationComponent = () => {
  return (
    <div className={styles.filterButton}>
      <span>Filter</span>
      <img className={styles.image} src={GreenFilterIcon} alt={"Filter icon"} />
    </div>
  );
};

export default ArticlesFiltrationComponent;
