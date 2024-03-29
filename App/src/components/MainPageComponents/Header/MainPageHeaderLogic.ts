import { roleContactRoute } from "constants/apiRoutes";
import { useCheckIfItemShouldBeClosed } from "hooks/ClickEvents/useCheckIfItemShouldBeClosed";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useLoginFlow } from "hooks/useloginFlow";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPageHeaderLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useCheckIfItemShouldBeClosed(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  const navigate = useNavigate();
  const { isMobile } = useAppResponsiveness();

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const navigateToRoleRequest = () => {
    navigate(`/${roleContactRoute}`);
  };

  const naviagteToHome = () => {
    navigate(`/`);
  };

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
    isMobile,
    handleDropdownOpen,
    handleClickOnLogin,
    handleClickOnRegister,
    handleLogOut,
    handleMoveToThePortal,
    appUser,
    dropdownRef,
    isDropdownOpen,
    naviagteToHome,
    accessTokenWasSet,
    hasAccessToPortal,
    navigateToRoleRequest,
  };
};

export default MainPageHeaderLogic;
