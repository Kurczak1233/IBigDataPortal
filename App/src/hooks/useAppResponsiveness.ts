import {
  smallLaptopMaxWidth,
  tabletMaxWidth,
  mobileMaxSize,
  tabletWidth,
  mediumLaptopSizeMaxWidth,
  mediumLaptopSize,
  desktopSize,
  smallMobileMaxSize,
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

  const isVerySmallMobile = useMediaQuery({
    maxWidth: smallMobileMaxSize,
  });
  return {
    isMobile,
    smallerLaptop,
    isDesktop,
    isTablet,
    isMediumLaptop,
    isVerySmallMobile,
  };
};
