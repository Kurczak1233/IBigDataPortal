import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./BigButton.module.scss";

const BigButtonLogic = () => {
  const handleGetColorHoverClass = (
    chosenColorEnum: AvailableIntensiveColors
  ) => {
    switch (chosenColorEnum) {
      case AvailableIntensiveColors.IntensiveGreen:
        return styles.buttonStylesGreen;
      case AvailableIntensiveColors.IntensiveOrange:
        return styles.buttonStylesOrange;
      default:
        return "";
    }
  };
  return { handleGetColorHoverClass };
};
export default BigButtonLogic;
