import { useLoginFlow } from "hooks/useloginFlow";

const UserDetailsComponentLogic = () => {
  const {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    hasAccessToPortal,
  } = useLoginFlow();
  return {
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    accessTokenWasSet,
    hasAccessToPortal,
  };
};

export default UserDetailsComponentLogic;
