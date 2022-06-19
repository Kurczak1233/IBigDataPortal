import AdminMenuContentGenerator from "components/common/AdminMenu/AdminMenuContentGenerator/AdminMenuContentGenerator";
import AdminMenuHeader from "components/common/AdminMenu/AdminMenuHeader/AdminMenuHeader";
import ArticleMenuContentLogic from "./ArticleMenuContentLogic";
import styles from "./ArticleMenuContent.module.scss";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";

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
      <SeparationSmallBar />
      <AdminMenuContentGenerator
        tableOfContents={adminMenuNavigationCreateContents}
        handleChangeState={handleChangeState}
        marginTop={"16px"}
      />
    </div>
  );
};

export default ArticleMenuContent;
