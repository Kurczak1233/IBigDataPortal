import { useAuth0 } from "@auth0/auth0-react";

const CommonPageMenuLogic = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: "/" });
  };

  return { handleLogout };
};
export default CommonPageMenuLogic;
