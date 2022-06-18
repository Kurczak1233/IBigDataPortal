import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./SeparationSmallGreenBar.module.scss";

interface ISeparationSmallBar {
  marginTop?: string;
  marginBottom?: string;
  color?: AvailableIntensiveColors;
}

const SeparationSmallBar = ({
  marginTop,
  marginBottom,
  color = AvailableIntensiveColors.IntensiveGreen,
}: ISeparationSmallBar) => {
  return (
    <div className={styles.separationBarWrapper}>
      <div
        style={{
          marginTop: marginTop,
          marginBottom: marginBottom,
          backgroundColor: `#${color}`,
        }}
        className={styles.separationBar}
      />
    </div>
  );
};
export default SeparationSmallBar;
