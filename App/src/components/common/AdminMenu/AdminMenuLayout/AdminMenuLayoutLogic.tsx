import { useAuth0 } from "@auth0/auth0-react";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useBaseUrl } from "hooks/useBaseUrl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";

const CommonPageMenuLogic = () => {
  const { logout } = useAuth0();
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isTablet, isMobile } = useAppResponsiveness();

  const navigateToMainPage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout({ returnTo: baseUrl });
    dispatch(updateAccessTokenWasSet(false));
  };

  return { handleLogout, navigateToMainPage, isTablet, isMobile };
};
export default CommonPageMenuLogic;
