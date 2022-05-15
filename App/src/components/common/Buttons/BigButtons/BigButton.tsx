import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import BigButtonLogic from "./BigButtonLogic";

interface IBigButton {
  uppercase?: boolean;
  text: string;
  color: AvailableIntensiveColors;
  onClick: () => void;
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
}

const BigButton = ({
  width,
  height,
  marginTop,
  marginBottom,
  uppercase = false,
  text,
  color,
  onClick,
}: IBigButton) => {
  const { handleGetColorHoverClass } = BigButtonLogic();
  return (
    <div
      onClick={onClick}
      style={{
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
        background: `#${color}`,
        textTransform: uppercase ? "uppercase" : "none",
      }}
      className={handleGetColorHoverClass(color)}
    >
      {text}
    </div>
  );
};

export default BigButton;
