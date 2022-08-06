import { useCheckIfItemShouldBeClosed } from "hooks/ClickEvents/useCheckIfItemShouldBeClosed";
import { useMemo, useRef, useState } from "react";

const UsersActionsDropdownLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  useCheckIfItemShouldBeClosed(isDropdownOpen, dropdownRef, setIsDropdownOpen);
  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
  };

  const showDropdownTopPosition = useMemo(() => {
    if (itemRef.current) {
      return window.innerHeight - itemRef.current.offsetTop <= 260;
    }
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen, itemRef]);

  return {
    handleOpenDropdown,
    isDropdownOpen,
    dropdownRef,
    showDropdownTopPosition,
    itemRef,
  };
};

export default UsersActionsDropdownLogic;
