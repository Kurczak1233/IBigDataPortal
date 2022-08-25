import SeparationLongBar from "components/common/SeparationLongBar/SeparationLongBar";
import styles from "./MenuComponentTitle.module.scss";

interface IMenuComponentTitle {
  name: string;
  marginTop?: string;
  marginBottom?: string;
}

const MenuComponentTitle = ({
  name,
  marginTop,
  marginBottom,
}: IMenuComponentTitle) => {
  return (
    <div
      style={{ marginBottom: marginBottom, marginTop: marginTop }}
      className={styles.wrapper}
    >
      <div className={styles.name}>{name}</div>
      <SeparationLongBar />
    </div>
  );
};

export default MenuComponentTitle;
