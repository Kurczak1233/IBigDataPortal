import styles from "./AdministartionPageHeader.module.scss";

interface IAdministartionPageHeader {
  pageTitle: string;
}

const AdministartionPageHeader = ({ pageTitle }: IAdministartionPageHeader) => {
  return (
    <div>
      <div className={styles.title}>{pageTitle}</div>
    </div>
  );
};
export default AdministartionPageHeader;
