import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./BigButton.module.scss";

interface IBigButton {
  uppercase?: boolean;
  text: string;
  color: AvailableIntensiveColors;
  onClick: () => void;
}

const BigButton = ({ uppercase = false, text, color, onClick }: IBigButton) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: `#${color}`,
        textTransform: uppercase ? "uppercase" : "none",
      }}
      className={styles.buttonStyles}
    >
      {text}
    </div>
  );
};

export default BigButton;
