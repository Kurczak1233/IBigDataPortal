import styles from "./CommonAdminPanelHeader.module.scss";

const CommonAdminPanelHeader = () => {
    const { userEmail } = CommonAdminPanelHeaderLogic();



  return <div>
      <span>Admin panel</span>
      <span></span>
  </div>;
};
export default CommonAdminPanelHeader;
