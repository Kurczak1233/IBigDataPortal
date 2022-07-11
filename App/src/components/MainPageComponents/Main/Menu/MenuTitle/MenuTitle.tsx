import styles from "./MenuTitle.module.scss";

interface IMenuTitle {
  name: string;
}

const MenuTitle = ({ name }: IMenuTitle) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.menuTitleBottomBar} />
    </div>
  );
};

export default MenuTitle;
