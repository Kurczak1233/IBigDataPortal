import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import FileModal from "components/common/FileModal/FileModal";
import { FileModuleEnum } from "components/common/FileModal/FileModuleEnum";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./ProfilePicture.module.scss";
import ProfilePictureLogic from "./ProfilePictureLogic";

interface IProfilePicture {
  profilePic: string;
}

const ProfilePicture = ({ profilePic }: IProfilePicture) => {
  const { setIsPictureModalOpen, isPictureModalOpen, handleOpenPictureModal } =
    ProfilePictureLogic();
  return (
    <div className={styles.pictureWrapper}>
      <FileModal
        setIsModalOpen={setIsPictureModalOpen}
        isModalOpen={isPictureModalOpen}
        moduleId={FileModuleEnum.userImage}
      />
      <div>
        <img
          width={250}
          height={250}
          src={`data:image/png;base64,${profilePic}`}
          alt="Profile pic"
        />
      </div>
      <SmallButton
        text={"Edit"}
        onClick={handleOpenPictureModal}
        color={AvailableIntensiveColors.IntensiveGreen}
        marginTop={"16px"}
      />
    </div>
  );
};

export default ProfilePicture;
