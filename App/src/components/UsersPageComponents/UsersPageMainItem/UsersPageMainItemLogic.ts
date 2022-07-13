import { updateUserRole } from "api/UserRoleClient";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useState } from "react";
import { IUpdateUserRole } from "./IUpdateUserRole";

const UsersPageMainItem = (
  setAllPortalUsers: React.Dispatch<React.SetStateAction<ApplicationUser[]>>
) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<number>();
  const handleUpdateUserRole = async (userId: number) => {
    if (!selectedRole) {
      return;
    }
    const request: IUpdateUserRole = {
      roleId: selectedRole,
      userId: userId,
    };
    await updateUserRole(request);
    setAllPortalUsers((oldUsers) => {
      const foundUser = oldUsers.find((item) => item.id === userId);
      if (!foundUser) {
        return oldUsers;
      }
      foundUser.userRoleId = selectedRole;
      return [...oldUsers];
    });
    setSelectedRole(undefined);
    setIsModalOpen(false);
  };

  const handleOpenModal = (roleId: number) => {
    setIsModalOpen(true);
    setSelectedRole(roleId);
  };

  return { handleUpdateUserRole, handleOpenModal, isModalOpen, setIsModalOpen };
};

export default UsersPageMainItem;
