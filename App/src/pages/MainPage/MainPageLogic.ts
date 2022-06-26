import { useAuth0 } from "@auth0/auth0-react";
import { initialUserCall } from "api/UsersClient";
import { useEffect, useState } from "react";

const MainPageLogic = () => {
  const [userWasChecked, setUserWasChecked] = useState<boolean>(false);
  const { isAuthenticated } = useAuth0();

  const handleInitServerMiddleWareInOrderToCheckUser = () => {
    initialUserCall();
    setUserWasChecked(true);
  };

  useEffect(() => {
    if (isAuthenticated && !userWasChecked) {
      handleInitServerMiddleWareInOrderToCheckUser();
    }
  }, [isAuthenticated, userWasChecked]);
};

export default MainPageLogic;
