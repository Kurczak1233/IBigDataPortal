import { roleContactRoute } from "constants/apiRoutes";
import { useNavigate } from "react-router-dom";

const InvitaitonsComponentLogic = () => {
  const navigate = useNavigate();
  const navigateToRoleRequest = () => {
    navigate(`/${roleContactRoute}`);
  };
  return {
    navigateToRoleRequest,
  };
};

export default InvitaitonsComponentLogic;
