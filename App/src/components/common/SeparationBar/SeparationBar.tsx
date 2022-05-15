import styles from "./SeparationBar.module.scss";

interface ISeparationBar {
  marginTop?: string;
  marginBottom?: string;
  width?: string;
}

const SeparationBar = ({ marginTop, marginBottom }: ISeparationBar) => {
  return (
    <div className={styles.separationBarWrapper}>
      <div
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
        className={styles.separationBar}
      />
    </div>
  );
};
export default SeparationBar;
