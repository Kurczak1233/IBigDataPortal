import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckIfItemShouldBeClosed } from "hooks/ClickEvents/useCheckIfItemShouldBeClosed";
import { useAppNavigationProps } from "hooks/useAppNavigationProps";

export interface IAdministrationRoute {
  routeUrl: string;
  routeName: string;
  imgNonActive: string;
  imgActive: string;
  isActive: boolean;
  alt: string;
  hasPermissionsToView: boolean | null;
  showAmountOfInvitations?: boolean;
}

const AdminMenuMobileHeaderLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useCheckIfItemShouldBeClosed(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  const { administrationRoutes } = useAppNavigationProps();
  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const navigate = useNavigate();
  const naviagteToHome = () => {
    navigate(`/`);
  };

  return {
    naviagteToHome,
    handleDropdownOpen,
    isDropdownOpen,
    administrationRoutes,
    dropdownRef,
    handleCloseDropdown,
  };
};

export default AdminMenuMobileHeaderLogic;
