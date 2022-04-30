import styles from "./CommonPageMenu.module.scss";

interface ICommonPageMenu {
  menuContent: JSX.Element;
  content: JSX.Element;
}

const CommonPageMenu = ({ menuContent, content }: ICommonPageMenu) => {
  return (
    <div className={styles.siteLayout}>
      <div className={styles.menu}>
        <div>{menuContent}</div>
        <div>
            Log out
        </div>
      </div>
      <div className={styles.contentLayout}>Content</div>
    </div>
  );
};
export default CommonPageMenu;
