import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";

const CommonPageMenuLogic = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToMainPage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    dispatch(updateAccessTokenWasSet(false));
  };

  return { handleLogout, navigateToMainPage };
};
export default CommonPageMenuLogic;
