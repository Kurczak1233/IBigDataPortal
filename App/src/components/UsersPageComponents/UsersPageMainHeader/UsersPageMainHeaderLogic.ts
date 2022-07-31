import { useAppResponsiveness } from "hooks/useAppResponsiveness";

export const UsersPageMainHeaderLogic = () => {
  const { isMobile, isTablet } = useAppResponsiveness();
  return { isMobile, isTablet };
};
