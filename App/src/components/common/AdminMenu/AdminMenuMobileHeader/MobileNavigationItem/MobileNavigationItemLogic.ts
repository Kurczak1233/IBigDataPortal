import { useAppNavigationProps } from "hooks/useAppNavigationProps";
import { useNavigate } from "react-router-dom";
import { IAdministrationRoute } from "../AdminMenuMobileHeaderLogic";

const MobileNavigationItemLogic = (item: IAdministrationRoute) => {
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(item.routeUrl);
  };

  const navigateToArticlesSubPage = (url: string) => {
    navigate(url);
  };

  const {
    adminMenuNavigationCreateContents,
    adminMenuNavigationOverviewContents,
  } = useAppNavigationProps();

  return {
    navigateToItem,
    adminMenuNavigationCreateContents,
    adminMenuNavigationOverviewContents,
    navigateToArticlesSubPage,
  };
};

export default MobileNavigationItemLogic;
