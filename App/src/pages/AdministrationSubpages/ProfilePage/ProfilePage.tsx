import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import BigLoader from "components/common/Loaders/BigLoader";
import ProfilePageMain from "components/ProfilePageComponents/ProfilePageMain/ProfilePageMain";
import ProfilePageLogic from "./ProfilePageLogic";

const ProfilePage = () => {
  const {
    userProfile,
    handleGetProfilePicture,
    setProfilePic,
    profilePic,
    setUserProfile,
  } = ProfilePageLogic();
  return (
    <>
      {userProfile && profilePic !== undefined ? (
        <>
          <AdministartionPageHeader pageTitle={"Personal settings"} />
          <ProfilePageMain
            userProfile={userProfile}
            handleGetProfilePicture={handleGetProfilePicture}
            setProfilePic={setProfilePic}
            setUserProfile={setUserProfile}
            profilePic={profilePic}
          />
        </>
      ) : (
        <BigLoader />
      )}
    </>
  );
};
export default ProfilePage;
