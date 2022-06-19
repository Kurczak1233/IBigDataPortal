import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import InputWthLabelReadonly from "components/common/Forms/InputWthLabelReadonly/InputWthLabelReadonly";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import styles from "./ProfilePageMain.module.scss";
import ProfilePageMainLogic from "./ProfilePageMainLogic";

interface IProfilePageMain {
  userProfile: IApplicationUser;
  handleGetProfilePicture: () => Promise<string | undefined>;
  setProfilePic: React.Dispatch<React.SetStateAction<FileVm | undefined>>;
  profilePic: FileVm;
}

const ProfilePageMain = ({
  userProfile,
  handleGetProfilePicture,
  setProfilePic,
  profilePic,
}: IProfilePageMain) => {
  const {
    register,
    errors,
    showEdit,
    handleSetShowEdit,
    handleChangeNickname,
    handleSubmit,
  } = ProfilePageMainLogic({
    userProfile,
  });

  return (
    <div>
      <div className={styles.myDetails}>My details</div>
      <ProfilePicture
        profilePic={profilePic}
        updatePicture={handleGetProfilePicture}
        setProfilePic={setProfilePic}
        userProfile={userProfile}
      />
      {!showEdit ? (
        <InputWthLabelReadonly
          label={"Nickname"}
          value={userProfile.nickname}
          marginTop={"16px"}
        />
      ) : (
        <InputWithLabel
          label={"Nickname"}
          height={"76px"}
          marginTop={"16px"}
          placeholder={"Enter nickname..."}
          registerName={"nickname"}
          register={register}
          errors={errors}
          errorMessage={"Nickname is obligatory"}
          registerOptions={{ required: true }}
        />
      )}
      <InputWthLabelReadonly
        label={"Email"}
        value={userProfile.email}
        marginTop={"16px"}
      />
      {!showEdit ? (
        <SmallButton
          text={"Edit"}
          onClick={handleSetShowEdit}
          color={AvailableIntensiveColors.IntensiveGreen}
          marginTop={"16px"}
        />
      ) : (
        <SmallButton
          text={"Save"}
          onClick={handleSubmit(handleChangeNickname)}
          color={AvailableIntensiveColors.IntensiveGreen}
          marginTop={"16px"}
        />
      )}
    </div>
  );
};

export default ProfilePageMain;
