import { useAppResponsiveness } from "hooks/useAppResponsiveness";

export const UsersPageMainHeaderLogic = () => {
  const { isMobile, isTablet, smallerLaptop } = useAppResponsiveness();
  return { isMobile, isTablet, smallerLaptop };
};
