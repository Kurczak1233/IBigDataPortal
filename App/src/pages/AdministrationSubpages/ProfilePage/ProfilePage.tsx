import AdministartionPageHeader from "components/common/AdministartionPageHeader/AdministartionPageHeader";
import BigLoader from "components/common/Loaders/BigLoader";
import ProfilePageMain from "components/ProfilePageComponents/ProfilePageMain/ProfilePageMain";
import ProfilePageLogic from "./ProfilePageLogic";

const ProfilePage = () => {
  const { userProfile } = ProfilePageLogic();
  return (
    <>
      {userProfile ? (
        <>
          <AdministartionPageHeader pageTitle={"Personal settings"} />
          <ProfilePageMain userProfile={userProfile}/>
        </>
      ) : (
        <BigLoader />
      )}
    </>
  );
};
export default ProfilePage;
