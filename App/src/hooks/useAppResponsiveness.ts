import {
  smallLaptopMaxWidth,
  tabletMaxWidth,
  mobileMaxSize,
  tabletWidth,
  mediumLaptopSizeMaxWidth,
  mediumLaptopSize,
  desktopSize,
} from "constants/mediaSizes";
import { useMediaQuery } from "react-responsive";

export const useAppResponsiveness = () => {
  const isDesktop = useMediaQuery({
    minWidth: desktopSize,
  });

  const isMediumLaptop = useMediaQuery({
    maxWidth: mediumLaptopSizeMaxWidth,
    minWidth: mediumLaptopSize,
  });

  const smallerLaptop = useMediaQuery({
    maxWidth: smallLaptopMaxWidth,
    minWidth: tabletWidth,
  });

  const isTablet = useMediaQuery({
    maxWidth: tabletMaxWidth,
    minWidth: tabletWidth,
  });

  const isMobile = useMediaQuery({
    maxWidth: mobileMaxSize,
  });
  return { isMobile, smallerLaptop, isDesktop, isTablet, isMediumLaptop };
};
