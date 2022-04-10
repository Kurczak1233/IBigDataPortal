import { useAuth0 } from "@auth0/auth0-react";

const MainPageLoginBarLogic = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const handleClickOnLogin = () => {
    loginWithRedirect();
  };

  const handleClickOnRegister = () => {
    logout();
  };

  return { handleClickOnLogin, handleClickOnRegister };
};

export default MainPageLoginBarLogic;
