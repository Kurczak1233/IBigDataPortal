import styles from "./AdministartionPageHeader.module.scss";

interface IAdministartionPageHeader {
  pageTitle: string;
  marginTop?: string;
  marginBottom?: string;
}

const AdministartionPageHeader = ({
  pageTitle,
  marginBottom,
  marginTop,
}: IAdministartionPageHeader) => {
  return (
    <div>
      <div
        className={styles.title}
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
      >
        {pageTitle}
      </div>
    </div>
  );
};
export default AdministartionPageHeader;
