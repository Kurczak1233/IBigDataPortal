import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { imageExtensions } from "components/common/FileModal/SupportedExtensions";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { FileVm } from "interfaces/Models/FilesMetadata/ViewModels/FileVm";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import styles from "./ProfilePicture.module.scss";
import ProfilePictureLogic from "./ProfilePictureLogic";

interface IProfilePicture {
  profilePic: FileVm | undefined;
  updatePicture: () => void;
  setProfilePic: React.Dispatch<React.SetStateAction<FileVm | undefined>>;
  userProfile: IApplicationUser;
}

const ProfilePicture = ({
  profilePic,
  updatePicture,
  setProfilePic,
  userProfile,
}: IProfilePicture) => {
  const {
    setIsPictureModalOpen,
    isPictureModalOpen,
    handleOpenPictureModal,
    handleOpenConfirmActionModal,
    isConfimActionModalOpen,
    setIsConfimrActionModalOpen,
    deletePicture,
  } = ProfilePictureLogic({ profilePic, setProfilePic });
  return (
    <>
      <FileModal
        setIsModalOpen={setIsPictureModalOpen}
        isModalOpen={isPictureModalOpen}
        moduleId={FileModuleEnum.userImage}
        itemId={userProfile.id}
        acceptedFilesExtensions={imageExtensions}
        updatePicture={updatePicture}
      />
      <ConfirmActionModal
        isConfimActionModalOpen={isConfimActionModalOpen}
        setIsConfirmActionModalOpen={setIsConfimrActionModalOpen}
        description={"delete profile picture"}
        handleConfirmAction={deletePicture}
      />
      <div className={styles.pictureWrapper}>
        {profilePic && !profilePic.isDeleted ? (
          <img
            className={styles.profilePictureFrame}
            src={`data:image/png;base64,${profilePic.base64FileString}`}
            alt="Profile pic"
          />
        ) : (
          <div className={styles.noPictureWrapper}>No picture</div>
        )}
        <div className={styles.buttons}>
          <SmallButton
            width="100px"
            text={profilePic && !profilePic.isDeleted ? "Edit" : "Add"}
            onClick={handleOpenPictureModal}
            color={AvailableIntensiveColors.IntensiveGreen}
            marginTop={"16px"}
          />
          {profilePic && !profilePic.isDeleted && (
            <SmallButton
              marginLeft="16px"
              width="100px"
              text={"Delete"}
              onClick={handleOpenConfirmActionModal}
              color={AvailableIntensiveColors.IntensiveRed}
              marginTop={"16px"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
