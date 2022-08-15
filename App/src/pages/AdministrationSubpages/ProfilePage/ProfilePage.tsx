import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import ProfilePageMain from "components/ProfilePageComponents/ProfilePageMain/ProfilePageMain";
import ProfilePageLogic from "./ProfilePageLogic";

const ProfilePage = () => {
  const { userProfile, setUserProfile, handleGetUserProfileRequest } =
    ProfilePageLogic();
  return (
    <>
      {userProfile ? (
        <>
          <AdministartionPageHeader pageTitle={"Personal settings"} />
          <ProfilePageMain
            userProfile={userProfile}
            handleGetUserProfileRequest={handleGetUserProfileRequest}
            setUserProfile={setUserProfile}
          />
        </>
      ) : (
        <div />
      )}
    </>
  );
};
export default ProfilePage;
