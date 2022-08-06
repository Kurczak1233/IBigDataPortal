import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import UsersActionsDropdownLogic from "./UsersActionsDropdownLogic";
import styles from "./UsersActionsDropdown.module.scss";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { UserRoles } from "enums/UserRoles";
import MenuComponentTitle from "components/MainPageComponents/Main/Menu/MenuComponentTitle/MenuComponentTitle";

interface IUsersActionsDropdown {
  handleOpenModal: (roleId: number) => void;
  user: ApplicationUser;
  handleOpenDeleteModal: () => void;
}

const UsersActionsDropdown = ({
  user,
  handleOpenModal,
  handleOpenDeleteModal,
}: IUsersActionsDropdown) => {
  const { handleOpenDropdown, isDropdownOpen, dropdownRef } =
    UsersActionsDropdownLogic();
  return (
    <div className={styles.dropdownButton}>
      <SmallButton
        text={"Actions"}
        width={"70px"}
        onClick={handleOpenDropdown}
        color={AvailableIntensiveColors.IntensiveOrange}
      />
      {isDropdownOpen && (
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <MenuComponentTitle name={"Roles"} />
          <div className={styles.roleButtons}>
            <SmallButton
              width={"80%"}
              text={"Admin"}
              onClick={() => handleOpenModal(UserRoles["Admin"])}
              marginRight={"1%"}
              marginTop={"8px"}
              color={
                user.userRoleId === UserRoles["Admin"]
                  ? AvailableIntensiveColors.IntensiveOrange
                  : AvailableIntensiveColors.InactiveGray
              }
            />{" "}
            <SmallButton
              width="80%"
              marginTop={"8px"}
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
              width="80%"
              marginTop={"8px"}
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
              width="80%"
              marginTop={"8px"}
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
          <MenuComponentTitle name={"Delete"} />
          <div className={styles.roleButtons}>
            <SmallButton
              text={"Delete"}
              onClick={handleOpenDeleteModal}
              width={"80%"}
              color={AvailableIntensiveColors.IntensiveRed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersActionsDropdown;
