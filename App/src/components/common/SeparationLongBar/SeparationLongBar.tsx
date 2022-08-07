import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./SeparationLongBar.module.scss";

interface ISeparationLongBar {
  barColor?: AvailableIntensiveColors;
  marginTop?: string;
  marginBottom?: string;
}

const SeparationLongBar = ({
  barColor = AvailableIntensiveColors.IntensiveGreen,
  marginBottom,
  marginTop,
}: ISeparationLongBar) => {
  return (
    <div
      style={{
        backgroundColor: `#${barColor}`,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
      className={styles.menuTitleBottomBar}
    />
  );
};

export default SeparationLongBar;
