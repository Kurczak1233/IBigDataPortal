import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { UserRoles } from "enums/UserRoles";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import UsersActionsDropdown from "./UsersActionsDropdown/UsersActionsDropdown";
import styles from "./UsersPageMainItem.module.scss";
import UsersPageMainItemLogic from "./UsersPageMainItemLogic";

interface IUsersPageMainItem {
  user: ApplicationUser;
  setAllPortalUsers: React.Dispatch<React.SetStateAction<ApplicationUser[]>>;
}

const UsersPageMainItem = ({
  user: applicationUser,
  setAllPortalUsers,
}: IUsersPageMainItem) => {
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
    isMobile,
    isTablet,
    smallerLaptop,
    user,
  } = UsersPageMainItemLogic(setAllPortalUsers, applicationUser.id);
  return (
    <div className={styles.item}>
      <ConfirmActionModal
        isConfimActionModalOpen={isModalOpen}
        setIsConfirmActionModalOpen={setIsModalOpen}
        description={"change this role"}
        handleConfirmAction={() => handleUpdateUserRole(applicationUser.id)}
      />
      <ConfirmActionModal
        isConfimActionModalOpen={isDeleteUserModalOpen}
        setIsConfirmActionModalOpen={setIsDeleteUserModalOpen}
        description={"delete this user"}
        handleConfirmAction={() => deleteUser(applicationUser.id)}
      />
      <div className={styles.nickname}>
        <span>{applicationUser.nickname}</span>
      </div>
      <div className={styles.email}>
        <span>{applicationUser.email}</span>
      </div>
      {!(isMobile || isTablet || smallerLaptop) ? (
        <>
          {user?.email !== applicationUser.email && (
            <div className={styles.role}>
              <SmallButton
                width={"23%"}
                text={"Admin"}
                onClick={() => handleOpenModal(UserRoles["Admin"])}
                marginRight={"1%"}
                color={
                  applicationUser.userRoleId === UserRoles["Admin"]
                    ? AvailableIntensiveColors.IntensiveOrange
                    : AvailableIntensiveColors.InactiveGray
                }
              />{" "}
              <SmallButton
                width="23%"
                text={"HEI"}
                marginRight={"1%"}
                onClick={() => handleOpenModal(UserRoles["HEI"])}
                color={
                  applicationUser.userRoleId === UserRoles["HEI"]
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
                  applicationUser.userRoleId === UserRoles["Employee"]
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
                  applicationUser.userRoleId === UserRoles["StudentOrBusiness"]
                    ? AvailableIntensiveColors.IntensiveOrange
                    : AvailableIntensiveColors.InactiveGray
                }
              />
            </div>
          )}
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
        </>
      ) : (
        <UsersActionsDropdown
          handleOpenModal={handleOpenModal}
          user={applicationUser}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default UsersPageMainItem;
