import { useAppResponsiveness } from "hooks/useAppResponsiveness";

const CooperationsPageHeaderLogic = () => {
  const { isMobile } = useAppResponsiveness();

  return { isMobile };
};

export default CooperationsPageHeaderLogic;
