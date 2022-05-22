import AdminMenuContentGenerator from "components/common/AdminMenu/AdminMenuContentGenerator/AdminMenuContentGenerator";
import AdminMenuHeader from "components/common/AdminMenu/AdminMenuHeader/AdminMenuHeader";
import SeparationBar from "components/common/SeparationBar/SeparationBar";
import ArticleMenuContentLogic from "./ArticleMenuContentLogic";
import styles from "./ArticleMenuContent.module.scss";

const ArticleMenuContent = () => {
  const {
    adminMenuNavigationOverviewContents,
    adminMenuNavigationCreateContents,
    handleChangeState,
  } = ArticleMenuContentLogic();
  return (
    <div className={styles.menuItemsGenerator}>
      <AdminMenuHeader />
      <AdminMenuContentGenerator
        tableOfContents={adminMenuNavigationOverviewContents}
        handleChangeState={handleChangeState}
        marginBottom={"16px"}
        marginTop={"32px"}
      />
      <SeparationBar />
      <AdminMenuContentGenerator
        tableOfContents={adminMenuNavigationCreateContents}
        handleChangeState={handleChangeState}
        marginTop={"16px"}
      />
    </div>
  );
};

export default ArticleMenuContent;
