import CommonAdminPanelHeaderLogic from "./CommonAdminPanelHeaderLogic";

const CommonAdminPanelHeader = () => {
  const { applicationUser } = CommonAdminPanelHeaderLogic();

  return (
    <div>
      <span>Admin panel</span>
      <span>{applicationUser?.email}</span>
    </div>
  );
};
export default CommonAdminPanelHeader;
