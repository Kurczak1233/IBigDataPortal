import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useAppNavigationProps } from "hooks/useAppNavigationProps";

const AdministrationLayoutLogic = () => {
  const { isTablet, isMobile } = useAppResponsiveness();
  const { administrationRoutes } = useAppNavigationProps();

  return { administrationRoutes, isTablet, isMobile };
};

export default AdministrationLayoutLogic;
