import { useLoginFlow } from "hooks/useloginFlow";

const UserDetailsComponentLogic = () => {
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    wasLoaded,
    hasAccessToPortal,
  } = useLoginFlow();
  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    wasLoaded,
    hasAccessToPortal,
  };
};

export default UserDetailsComponentLogic;
