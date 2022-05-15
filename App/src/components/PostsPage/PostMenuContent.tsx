import AdminMenuContentGenerator from "components/common/AdminMenu/AdminMenuContentGenerator/AdminMenuContentGenerator";
import AdminMenuHeader from "components/common/AdminMenu/AdminMenuHeader/AdminMenuHeader";
import SeparationBar from "components/common/SeparationBar/SeparationBar";
import PostMenuContentLogic from "./PostMenuContentLogic";

const PostMenuContent = () => {
  const {
    adminMenuNavigationOverviewContents,
    adminMenuNavigationCreateContents,
    handleChangeState,
  } = PostMenuContentLogic();
  return (
    <div>
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

export default PostMenuContent;
