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
      default:
        "";
    }
  };
  return { handleGetColorHoverClass };
};
export default SmallButtonLogic;
