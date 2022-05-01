import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import SyncToast from "components/common/Toasts/SyncToast/SyncToast";
import { ToastModes } from "interfaces/General/ToastModes";
import NoAccessComponent from "components/common/NoAccessComponent/NoAccessComponent";

const AppLogic = () => {
  const [isAccessTokenSet, setIsAccessTokenSet] = useState<boolean>(false);

  const { getAccessTokenSilently, logout, isAuthenticated } = useAuth0();
  const getAccessTokenAndSetAxiosInterceptors = async () => {
    const accessToken = await getAccessTokenSilently();
    if (accessToken !== "") {
      setAxiosInterceptor(accessToken);
      setIsAccessTokenSet(true);
    }
  };
  const setAxiosInterceptor = (accessToken: string) => {
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
  };

  const checkIfRouteIsAuthenticated = (component: JSX.Element) => {
    return !isAccessTokenSet ? (
      <div />
    ) : isAuthenticated ? (
      component
    ) : (
      <NoAccessComponent />
    );
  };

  useEffect(() => {
    if (!isAccessTokenSet && isAuthenticated)
      getAccessTokenAndSetAxiosInterceptors();
  }, [isAccessTokenSet, isAuthenticated]);

  return { checkIfRouteIsAuthenticated };
};

export default AppLogic;
