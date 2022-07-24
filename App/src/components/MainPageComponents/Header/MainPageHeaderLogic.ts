import { roleContactRoute } from "constants/apiRoutes";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useLoginFlow } from "hooks/useloginFlow";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPageHeaderLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isMobile } = useAppResponsiveness();

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const navigateToRoleRequest = () => {
    navigate(`/${roleContactRoute}`);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkIfClickedOutside = (e: { target: any }) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

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
    accessTokenWasSet,
    hasAccessToPortal,
    navigateToRoleRequest,
  };
};

export default MainPageHeaderLogic;
