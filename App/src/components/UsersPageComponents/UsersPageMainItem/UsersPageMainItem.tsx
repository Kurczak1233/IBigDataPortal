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
  const { handleUpdateUserRole, isModalOpen, setIsModalOpen, handleOpenModal } =
    UsersPageMainItemLogic(setAllPortalUsers);
  return (
    <div className={styles.item}>
      <ConfirmActionModal
        isConfimActionModalOpen={isModalOpen}
        setIsConfirmActionModalOpen={setIsModalOpen}
        description={"change this role"}
        handleConfirmAction={() => handleUpdateUserRole(user.id)}
      />
      <div className={styles.nickname}>{user.nickname}</div>
      <div className={styles.email}>{user.email}</div>
      <div className={styles.role}>
        <SmallButton
          width="19%"
          text={"Admin"}
          onClick={() => handleOpenModal(UserRoles["Admin"])}
          color={
            user.userRoleId === UserRoles["Admin"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="19%"
          text={"Employee"}
          onClick={() => handleOpenModal(UserRoles["Employee"])}
          color={
            user.userRoleId === UserRoles["Employee"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="19%"
          text={"HEI"}
          onClick={() => handleOpenModal(UserRoles["HEI"])}
          color={
            user.userRoleId === UserRoles["HEI"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="19%"
          text={"Stu/Bus"}
          onClick={() => handleOpenModal(UserRoles["StudentOrBusiness"])}
          color={
            user.userRoleId === UserRoles["StudentOrBusiness"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          width="19%"
          text={"User"}
          onClick={() => handleOpenModal(UserRoles["User"])}
          color={
            user.userRoleId === UserRoles["User"]
              ? AvailableIntensiveColors.IntensiveOrange
              : AvailableIntensiveColors.InactiveGray
          }
        />
      </div>
    </div>
  );
};

export default UsersPageMainItem;
