import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { Triangle } from "react-loader-spinner";
import SmallButtonLogic from "./SmallButtonLogic";

interface ISmallButton {
  text: string;
  onClick: () => void;
  color: AvailableIntensiveColors;
  isLoading?: boolean;
  width?: string;
  uppercase?: boolean;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

const SmallButton = ({
  width,
  height,
  isLoading,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  uppercase = false,
  text,
  color,
  onClick,
}: ISmallButton) => {
  const { handleGetColorHoverClass } = SmallButtonLogic();
  return (
    <div
      onClick={onClick}
      style={{
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        background: `#${color}`,
        textTransform: uppercase ? "uppercase" : "none",
      }}
      className={handleGetColorHoverClass(color)}
    >
      {isLoading ? (
        <Triangle color={"white"} width={26} height={26} ariaLabel="loading" />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};
export default SmallButton;
