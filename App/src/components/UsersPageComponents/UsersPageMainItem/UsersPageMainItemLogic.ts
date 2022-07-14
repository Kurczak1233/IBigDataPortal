import { updateUserRole } from "api/UserRoleClient";
import { deleteUser } from "api/UsersClient";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { forbiddenException } from "constants/errorExceptions";
import { ToastModes } from "interfaces/General/ToastModes";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { IUpdateUserRole } from "./IUpdateUserRole";

const UsersPageMainItem = (
  setAllPortalUsers: React.Dispatch<React.SetStateAction<ApplicationUser[]>>,
  userId: number
) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<number>();
  const appUser = useSelector(
    (state: RootState) => state.applicationUserReducer.user
  );
  const handleUpdateUserRole = async (userId: number) => {
    if (!selectedRole) {
      return;
    }
    const request: IUpdateUserRole = {
      roleId: selectedRole,
      userId: userId,
    };
    try {
      await updateUserRole(request);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response.data === forbiddenException) {
        return SyncToast({
          mode: ToastModes.Error,
          description: forbiddenException,
        });
      } else {
        return SyncToast({
          mode: ToastModes.Error,
          description: "Updating permission went wrong",
        });
      }
    }

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

  const handleOpenDeleteModal = () => {
    setIsDeleteUserModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    setAllPortalUsers((oldUsers) => {
      const filteredUsers = oldUsers.filter((item) => item.id !== userId);
      return [...filteredUsers];
    });
    setIsDeleteUserModalOpen(false);
  };

  const isDeleteIconVisible = useMemo(
    () => appUser?.id !== userId,
    [appUser?.id, userId]
  );

  return {
    handleUpdateUserRole,
    handleOpenModal,
    isModalOpen,
    setIsModalOpen,
    handleDeleteUser,
    handleOpenDeleteModal,
    isDeleteUserModalOpen,
    setIsDeleteUserModalOpen,
    isDeleteIconVisible,
  };
};

export default UsersPageMainItem;
