import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import NoAccessComponent from "components/common/NoAccessComponent/NoAccessComponent";
import { initialUserCall } from "api/UsersClient";

const AppLogic = () => {
  const [isAccessTokenSet, setIsAccessTokenSet] = useState<boolean>(false);
  const [userWasChecked, setUserWasChecked] = useState<boolean>(false);
  const { getAccessTokenSilently, logout, isAuthenticated, isLoading } =
    useAuth0();

  const handleInitServerMiddleWareInOrderToCheckUser = () => {
    initialUserCall();
    setUserWasChecked(true);
  };

  useEffect(() => {
    if (isAuthenticated && !userWasChecked && !isLoading && isAccessTokenSet) {
      handleInitServerMiddleWareInOrderToCheckUser();
    }
  }, [isAuthenticated, userWasChecked, isLoading, isAccessTokenSet]);

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
          logout();
        }
      );
    },
    [logout]
  );

  const getAccessTokenAndSetAxiosInterceptors = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    if (accessToken !== "") {
      setAxiosInterceptor(accessToken);
    }
    setIsAccessTokenSet(true);
  }, [getAccessTokenSilently, setAxiosInterceptor]);

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

  return { checkIfRouteIsAuthenticated };
};

export default AppLogic;
