import { Triangle } from "react-loader-spinner";
import styles from "./SmallLoader.module.scss";

const SmallLoader = () => {
  return (
    <div className={styles.wrapper}>
      <Triangle height="20" width="20" color="#036613" ariaLabel="loading" />
    </div>
  );
};

export default SmallLoader;
