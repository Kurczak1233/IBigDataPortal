import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import NoAccessComponent from "components/common/NoAccessComponent/NoAccessComponent";
import { updateAccessTokenWasSet } from "redux/slices/accessTokenSlice";
import { useDispatch } from "react-redux";

const AppLogic = () => {
  const [isAccessTokenSet, setIsAccessTokenSet] = useState<boolean>(false);
  const [userWasChecked, setUserWasChecked] = useState<boolean>(false);
  const { getAccessTokenSilently, logout, isAuthenticated, isLoading } =
    useAuth0();

  const dispatch = useDispatch();

  const handleInitServerMiddleWareInOrderToCheckUser = useCallback(async () => {
    dispatch(updateAccessTokenWasSet(true));
    setUserWasChecked(true);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !userWasChecked && !isLoading && isAccessTokenSet) {
      handleInitServerMiddleWareInOrderToCheckUser();
    }
  }, [
    isAuthenticated,
    userWasChecked,
    isLoading,
    isAccessTokenSet,
    handleInitServerMiddleWareInOrderToCheckUser,
  ]);

  const setAxiosInterceptor = useCallback(
    (accessToken: string) => {
      axios.interceptors.request.use(
        (config) => {
          if (config && config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config;
        },
        () => {
          SyncToast({
            mode: ToastModes.Error,
            description: "Cannot authorize, please login again",
          });
          logout({ returnTo: "/" });
        }
      );
    },
    [logout]
  );

  const getAccessTokenAndSetAxiosInterceptors = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    if (accessToken !== "") {
      setAxiosInterceptor(accessToken);
      dispatch(updateAccessTokenWasSet(true));
    }
    setIsAccessTokenSet(true);
  }, [dispatch, getAccessTokenSilently, setAxiosInterceptor]);

  const checkIfRouteIsAuthenticated = (component: JSX.Element) => {
    return !isAuthenticated && !isLoading ? (
      <NoAccessComponent />
    ) : isAccessTokenSet && isAuthenticated ? (
      component
    ) : (
      <div />
    );
  };

  useEffect(() => {
    if (!isAccessTokenSet && isAuthenticated) {
      getAccessTokenAndSetAxiosInterceptors();
    }
  }, [
    getAccessTokenAndSetAxiosInterceptors,
    isAccessTokenSet,
    isAuthenticated,
  ]);
  const alertUser = useCallback(() => {
    return dispatch(updateAccessTokenWasSet(false));
  }, [dispatch]);

  //Refresh page --> reset accessToken
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [alertUser, dispatch]);

  return { checkIfRouteIsAuthenticated };
};

export default AppLogic;
