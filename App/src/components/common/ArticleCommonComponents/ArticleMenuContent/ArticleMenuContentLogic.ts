import { administrationRoute, articlesRoute } from "constants/apiRoutes";
import { useAppNavigationProps } from "hooks/useAppNavigationProps";
import { useNavigate } from "react-router-dom";

const PostMenuContentLogic = () => {
  const navigate = useNavigate();

  const handleChangeState = (route: string) => {
    navigate(`/${administrationRoute}/${articlesRoute}/${route}`);
  };

  const {
    adminMenuNavigationCreateContents,
    adminMenuNavigationOverviewContents,
  } = useAppNavigationProps();

  return {
    handleChangeState,
    adminMenuNavigationOverviewContents,
    adminMenuNavigationCreateContents,
  };
};

export default PostMenuContentLogic;
