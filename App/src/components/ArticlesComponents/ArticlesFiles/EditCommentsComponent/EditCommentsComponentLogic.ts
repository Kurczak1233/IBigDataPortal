import { useAppResponsiveness } from "hooks/useAppResponsiveness";
import { useMemo } from "react";

const EditCommentsComponentLogic = () => {
  const { smallerLaptop, isMobile, isTablet } = useAppResponsiveness();
  const isSmallerThanMediumLaptop = useMemo(() => {
    return smallerLaptop || isMobile || isTablet;
  }, [isMobile, isTablet, smallerLaptop]);
  return { isSmallerThanMediumLaptop };
};

export default EditCommentsComponentLogic;
