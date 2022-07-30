import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMenuMobileHeaderLogic = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const navigate = useNavigate();
  const naviagteToHome = () => {
    navigate(`/`);
  };
  return { naviagteToHome, handleDropdownOpen, isDropdownOpen };
};

export default AdminMenuMobileHeaderLogic;
