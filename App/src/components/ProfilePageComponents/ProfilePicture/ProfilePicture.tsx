import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./ProfilePicture.module.scss";
import ProfilePictureLogic from "./ProfilePictureLogic";

const ProfilePicture = () => {
  const { handleOpenPictureModal } = ProfilePictureLogic();
  return (
    <div className={styles.pictureWrapper}>
      <div>
        <img width={250} height={250} src="" alt="" />
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
