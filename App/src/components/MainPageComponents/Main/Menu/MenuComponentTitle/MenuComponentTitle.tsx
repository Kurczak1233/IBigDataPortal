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
      <div className={styles.menuTitleBottomBar} />
    </div>
  );
};

export default MenuComponentTitle;
