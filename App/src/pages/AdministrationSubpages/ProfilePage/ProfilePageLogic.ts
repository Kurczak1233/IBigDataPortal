import { getApplicationUser } from "api/UsersClient";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useEffect, useState } from "react";

const ProfilePageLogic = () => {
  const [userProfile, setUserProfile] = useState<ApplicationUser>();

  const handleGetUserProfileRequest = async () => {
    setUserProfile(await getApplicationUser());
  };

  useEffect(() => {
    handleGetUserProfileRequest();
  }, []);

  return {
    userProfile,
    setUserProfile,
    handleGetUserProfileRequest,
  };
};
export default ProfilePageLogic;
