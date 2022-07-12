import styles from "./MenuComponentTitle.module.scss";

interface IMenuComponentTitle {
  name: string;
}

const MenuComponentTitle = ({ name }: IMenuComponentTitle) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.menuTitleBottomBar} />
    </div>
  );
};

export default MenuComponentTitle;
