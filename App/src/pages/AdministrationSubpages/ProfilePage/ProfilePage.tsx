import BigLoader from "components/common/Loaders/BigLoader";
import ProfilePageLogic from "./ProfilePageLogic";

const ProfilePage = () => {
  const { userProfile } = ProfilePageLogic();

  return (
    <>
      {userProfile ? (
        // <ProfileContent userProfile={userProfile} />
        <div>XD</div>
      ) : (
        <BigLoader />
      )}
    </>
  );
};
export default ProfilePage;
