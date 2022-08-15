import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { imageExtensions } from "components/common/FileModal/SupportedExtensions";
import BigLoader from "components/common/Loaders/BigLoader/BigLoader";
import ConfirmActionModal from "components/common/Modals/ConfirmActionModal/ConfirmActionModal";
import { filesStorageBaseUrl } from "constants/storageBaseUrl";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import styles from "./ProfilePicture.module.scss";
import ProfilePictureLogic from "./ProfilePictureLogic";

interface IProfilePicture {
  handleGetUserProfileRequest: () => Promise<void>;
  userProfile: ApplicationUser;
}

const ProfilePicture = ({
  handleGetUserProfileRequest,
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
    setPictureLoaded,
    pictureLoaded,
  } = ProfilePictureLogic(userProfile);
  return (
    <>
      <FileModal
        setIsModalOpen={setIsPictureModalOpen}
        isModalOpen={isPictureModalOpen}
        moduleId={FileModuleEnum.userImage}
        itemId={userProfile.id}
        acceptedFilesExtensions={imageExtensions}
        updatePicture={handleGetUserProfileRequest}
        lastProfilePicGuid={userProfile.profilePictureGuid}
        deleteLastImageBeforeUpload={true}
      />
      <ConfirmActionModal
        isConfimActionModalOpen={isConfimActionModalOpen}
        setIsConfirmActionModalOpen={setIsConfimrActionModalOpen}
        description={"delete profile picture"}
        handleConfirmAction={deletePicture}
      />
      <div className={styles.pictureWrapper}>
        {userProfile.profilePictureGuid &&
        userProfile.profilePictureGuid !== "" ? (
          <>
            <img
              style={pictureLoaded ? {} : { display: "none" }}
              className={styles.profilePictureFrame}
              src={`${filesStorageBaseUrl}${userProfile.profilePictureGuid}`}
              alt="Profile pic"
              width={250}
              height={250}
              onLoad={() => setPictureLoaded(true)}
            />
            {!pictureLoaded && (
              <div className={styles.noPictureWrapper}>
                <BigLoader />
              </div>
            )}
          </>
        ) : (
          <div className={styles.noPictureWrapper}>No picture</div>
        )}
        <div className={styles.buttons}>
          <SmallButton
            width="100px"
            text={
              userProfile.profilePictureGuid &&
              userProfile.profilePictureGuid !== ""
                ? "Edit"
                : "Add"
            }
            onClick={handleOpenPictureModal}
            color={AvailableIntensiveColors.IntensiveGreen}
            marginTop={"16px"}
          />
          {userProfile.profilePictureGuid &&
            userProfile.profilePictureGuid !== "" && (
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
