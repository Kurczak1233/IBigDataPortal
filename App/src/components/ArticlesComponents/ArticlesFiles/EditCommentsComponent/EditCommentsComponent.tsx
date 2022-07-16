import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { UserRoles } from "enums/UserRoles";
import styles from "./EditCommentsComponent.module.scss";
interface IEditCommentsComponent {
  visibilityPermissions: UserRoles;
  setCommentsPermission: React.Dispatch<React.SetStateAction<UserRoles>>;
  commentsPermission: UserRoles;
  setVisibilityPermissions: React.Dispatch<React.SetStateAction<UserRoles>>;
  intensiveColor: AvailableIntensiveColors;
}

const EditCommentsComponent = ({
  visibilityPermissions,
  setVisibilityPermissions,
  commentsPermission,
  setCommentsPermission,
  intensiveColor,
}: IEditCommentsComponent) => {
  return (
    <div className={styles.permissionsWrapper}>
      <div className={styles.commentsSection}>
        <div className={styles.title}>Comments</div>
        <SmallButton
          text={"Users"}
          onClick={() => setCommentsPermission(UserRoles.StudentOrBusiness)}
          marginBottom={"12px"}
          color={
            UserRoles.StudentOrBusiness <= commentsPermission
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"Employee"}
          onClick={() => setCommentsPermission(UserRoles.Employee)}
          marginBottom={"12px"}
          color={
            UserRoles.Employee <= commentsPermission
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"HEI"}
          onClick={() => setCommentsPermission(UserRoles.HEI)}
          marginBottom={"12px"}
          color={
            UserRoles.HEI <= commentsPermission
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"Prohibited"}
          onClick={() => setCommentsPermission(UserRoles.Nobody)}
          marginBottom={"12px"}
          color={AvailableIntensiveColors.IntensiveRed}
        />
      </div>
      <div className={styles.articleSection}>
        <div className={styles.title}>Article visibility</div>
        <SmallButton
          text={"Everybody"}
          onClick={() => setVisibilityPermissions(UserRoles.Everybody)}
          marginBottom={"12px"}
          color={
            UserRoles.Everybody <= visibilityPermissions
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"Users"}
          onClick={() => setVisibilityPermissions(UserRoles.StudentOrBusiness)}
          marginBottom={"12px"}
          color={
            UserRoles.StudentOrBusiness <= visibilityPermissions
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"Employee"}
          onClick={() => setVisibilityPermissions(UserRoles.Employee)}
          marginBottom={"12px"}
          color={
            UserRoles.Employee <= visibilityPermissions
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
        <SmallButton
          text={"HEI"}
          onClick={() => setVisibilityPermissions(UserRoles.HEI)}
          marginBottom={"12px"}
          color={
            UserRoles.HEI <= visibilityPermissions
              ? intensiveColor
              : AvailableIntensiveColors.InactiveGray
          }
        />
      </div>
    </div>
  );
};

export default EditCommentsComponent;
