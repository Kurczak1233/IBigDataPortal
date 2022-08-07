import { ArticlesTypes } from "enums/ArticlesTypes";
import ArticlesFiltrationComponent from "../ArticlesFiltrationComponent/ArticlesFiltrationComponent";
import styles from "./AdministartionPageHeader.module.scss";

interface IAdministartionPageHeader {
  pageTitle: string;
  marginTop?: string;
  marginBottom?: string;
  showFilterComponent?: boolean;
  articleType?: ArticlesTypes;
}

const AdministartionPageHeader = ({
  pageTitle,
  marginBottom,
  marginTop,
  showFilterComponent,
  articleType = ArticlesTypes.Post,
}: IAdministartionPageHeader) => {
  return (
    <div>
      <div
        className={styles.title}
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
      >
        <span>{pageTitle}</span>
        {showFilterComponent && (
          <ArticlesFiltrationComponent articleType={articleType} />
        )}
      </div>
    </div>
  );
};
export default AdministartionPageHeader;
