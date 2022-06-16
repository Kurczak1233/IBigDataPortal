import { getApplicationUser } from "api/UsersClient";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";
import { useEffect, useState } from "react";

const ProfilePageLogic = () => {
  const [userProfile, setUserProfile] = useState<IApplicationUser>();

  const handleGetUserProfileRequest = async () => {
    setUserProfile(await getApplicationUser());
  };

  useEffect(() => {
    handleGetUserProfileRequest();
  }, []);

  return { userProfile };
};
export default ProfilePageLogic;
