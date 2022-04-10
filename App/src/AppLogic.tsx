import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

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
        // SyncToast({
        //   mode: ToastModes.error,
        //   message: "Cannot authorize, please login again",
        // });
        logout();
      }
    );
  };

  useEffect(() => {
    if (!isAccessTokenSet && isAuthenticated)
      getAccessTokenAndSetAxiosInterceptors();
  }, [isAccessTokenSet, isAuthenticated]);

  return {};
};

export default AppLogic;
