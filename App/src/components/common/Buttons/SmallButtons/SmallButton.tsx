import styles from "./SmallButton.module.scss";

interface ISmallButton {
  text: string;
  onClick: () => void;
  marginLeft?: number;
  marginRight?: number;
}

const SmallButton = ({
  marginLeft,
  marginRight,
  text,
  onClick,
}: ISmallButton) => {
  return (
    <div
      style={{ marginRight: marginRight, marginLeft: marginLeft }}
      onClick={onClick}
      className={styles.smallButton}
    >
      {text}
    </div>
  );
};
export default SmallButton;
