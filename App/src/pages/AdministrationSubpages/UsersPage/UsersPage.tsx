import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import UsersPageMain from "components/UsersPageComponents/UsersPageMain/UsersPageMain";

const UsersPage = () => {
  return (
    <>
      <AdministartionPageHeader pageTitle={"User management"} />
      <UsersPageMain />
    </>
  );
};
export default UsersPage;
