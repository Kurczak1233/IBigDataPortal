import ArticlesFiltrationComponent from "../ArticlesFiltrationComponent/ArticlesFiltrationComponent";
import styles from "./AdministartionPageHeader.module.scss";

interface IAdministartionPageHeader {
  pageTitle: string;
  marginTop?: string;
  marginBottom?: string;
  showFilterComponent?: boolean;
}

const AdministartionPageHeader = ({
  pageTitle,
  marginBottom,
  marginTop,
  showFilterComponent,
}: IAdministartionPageHeader) => {
  return (
    <div>
      <div
        className={styles.title}
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
      >
        <span>{pageTitle}</span>
        {showFilterComponent && <ArticlesFiltrationComponent />}
      </div>
    </div>
  );
};
export default AdministartionPageHeader;
