import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./SmallButton.module.scss";

const SmallButtonLogic = () => {
  const handleGetColorHoverClass = (
    chosenColorEnum: AvailableIntensiveColors
  ) => {
    switch (chosenColorEnum) {
      case AvailableIntensiveColors.IntensiveGreen:
        return styles.buttonStylesGreen;
      case AvailableIntensiveColors.IntensiveOrange:
        return styles.buttonStylesOrange;
      case AvailableIntensiveColors.IntensiveBlue:
        return styles.buttonStylesBlue;
      case AvailableIntensiveColors.IntensiveRed:
        return styles.buttonStylesRed;
      default:
        return "";
    }
  };
  return { handleGetColorHoverClass };
};
export default SmallButtonLogic;
