import { useCheckIfItemShouldBeClosed } from "hooks/ClickEvents/useCheckIfItemShouldBeClosed";
import { useRef, useState } from "react";

const UsersActionsDropdownLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useCheckIfItemShouldBeClosed(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
  };

  return {
    handleOpenDropdown,
    isDropdownOpen,
    dropdownRef,
  };
};

export default UsersActionsDropdownLogic;
