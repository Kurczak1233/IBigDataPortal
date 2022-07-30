import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import OrangeCalendarIcon from "public/PostsIcons/OrangeCalendarIcon.svg";
import OrangeFeatherIcon from "public/PostsIcons/OrangeFeatherIcon.svg";
import OrangeLampIcon from "public/PostsIcons/OrangeLampIcon.svg";
import BlueCalendarIcon from "public/PostsIcons/BlueCalendarIcon.svg";
import BlueFeatherIcon from "public/PostsIcons/BlueFeatherIcon.svg";
import BlueLampIcon from "public/PostsIcons/BlueLampIcon.svg";
import GreenCalendarIcon from "public/PostsIcons/GreenCalendarIcon.svg";
import GreenFeatherIcon from "public/PostsIcons/GreenFeatherIcon.svg";
import GreenLampIcon from "public/PostsIcons/GreenLampIcon.svg";
import { useAppResponsiveness } from "hooks/useAppResponsiveness";

const PostsHeaderLogic = () => {
  const { isTablet, isMobile } = useAppResponsiveness();
  const getApppriateImagesColours = (color: AvailableIntensiveColors) => {
    switch (color) {
      case AvailableIntensiveColors.IntensiveOrange: {
        return {
          calendarIcon: OrangeCalendarIcon,
          featherIcon: OrangeFeatherIcon,
          lampIcon: OrangeLampIcon,
        };
      }
      case AvailableIntensiveColors.IntensiveBlue: {
        return {
          calendarIcon: BlueCalendarIcon,
          featherIcon: BlueFeatherIcon,
          lampIcon: BlueLampIcon,
        };
      }
      case AvailableIntensiveColors.IntensiveGreen: {
        return {
          calendarIcon: GreenCalendarIcon,
          featherIcon: GreenFeatherIcon,
          lampIcon: GreenLampIcon,
        };
      }
      default: {
        return {
          calendarIcon: OrangeCalendarIcon,
          featherIcon: OrangeFeatherIcon,
          lampIcon: OrangeLampIcon,
        };
      }
    }
  };
  return { getApppriateImagesColours, isTablet, isMobile };
};

export default PostsHeaderLogic;
