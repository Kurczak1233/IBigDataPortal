import { useAppNavigationProps } from "hooks/useAppNavigationProps";
import { useNavigate } from "react-router-dom";
import { IAdministrationRoute } from "../AdminMenuMobileHeaderLogic";

const MobileNavigationItemLogic = (
  item: IAdministrationRoute,
  handleCloseDropdown: () => void
) => {
  const navigate = useNavigate();

  const navigateToItem = () => {
    navigate(item.routeUrl);
    handleCloseDropdown();
  };

  const navigateToArticlesSubPage = (url: string) => {
    navigate(url);
    handleCloseDropdown();
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
