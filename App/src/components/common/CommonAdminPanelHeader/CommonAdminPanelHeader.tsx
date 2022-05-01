import CommonAdminPanelHeaderLogic from "./CommonAdminPanelHeaderLogic";

const CommonAdminPanelHeader = () => {
  const { applicationUser, success } = CommonAdminPanelHeaderLogic();

  return (
    <div>
      <span>Admin panel {success}</span>
      <span>{applicationUser?.email}</span>
    </div>
  );
};
export default CommonAdminPanelHeader;
