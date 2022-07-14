import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { UserRoles } from "enums/UserRoles";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import styles from "./UsersPageMainItem.module.scss";
import UsersPageMainItemLogic from "./UsersPageMainItemLogic";

interface IUsersPageMainItem {
  user: ApplicationUser;
  setAllPortalUsers: React.Dispatch<React.SetStateAction<ApplicationUser[]>>;
}

const UsersPageMainItem = ({ user, setAllPortalUsers }: IUsersPageMainItem) => {
  const {
    handleUpdateUserRole,
    isModalOpen,
    setIsModalOpen,
    handleOpenModal,
    handleOpenDeleteModal,
    handleDeleteUser: deleteUser,
    isDeleteUserModalOpen,
    setIsDeleteUserModalOpen,
    isDeleteIconVisible,
  } = UsersPageMainItemLogic(setAllPortalUsers, user.id);
  return (
    <div className={styles.item}>
      <ConfirmActionModal
        isConfimActionModalOpen={isModalOpen}
        setIsConfirmActionModalOpen={setIsModalOpen}
        description={"change this role"}
        handleConfirmAction={() => handleUpdateUserRole(user.id)}
      />
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteUserModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteUserModalOpen}
        description={"delete this user"}
        handleConfirmAction={() => deleteUser(user.id)}
      />
      <div className={styles.nickname}>{user.nickname}</div>
      <div className={styles.email}>{user.email}</div>
      <div className={styles.role}>
        <SmallButton
          width={"23%"}
          text={"Admin"}
          onClick={() => handleOpenModal(UserRoles["Admin"])}
          marginRight={"1%"}
          color={
            user.userRoleId === UserRoles["Admin"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="23%"
          text={"Employee"}
          marginRight={"1%"}
          onClick={() => handleOpenModal(UserRoles["Employee"])}
          color={
            user.userRoleId === UserRoles["Employee"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="23%"
          text={"HEI"}
          marginRight={"1%"}
          onClick={() => handleOpenModal(UserRoles["HEI"])}
          color={
            user.userRoleId === UserRoles["HEI"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="23%"
          text={"Stu/Bus"}
          marginRight={"1%"}
          onClick={() => handleOpenModal(UserRoles["StudentOrBusiness"])}
          color={
            user.userRoleId === UserRoles["StudentOrBusiness"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
      </div>
      <div className={styles.deleteButtonWrapper}>
        {isDeleteIconVisible && (
          <SmallButton
            text={"Delete"}
            onClick={handleOpenDeleteModal}
            width={"100px"}
            marginLeft={"16px"}
            color={AvailableIntensiveColors.IntensiveRed}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPageMainItem;
