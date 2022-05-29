import { Triangle } from "react-loader-spinner";
import styles from "./BigLoader.module.scss";

const BigLoader = () => {
  return (
    <div className={styles.wrapper}>
      <Triangle height="100" width="100" color="#036613" ariaLabel="loading" />
    </div>
  );
};

export default BigLoader;
