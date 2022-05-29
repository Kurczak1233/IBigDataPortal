import "./NoItemsComponent.module.scss";
import AddPostIcon from "public/PostsIcons/AddPostIcon.svg";
import styles from "./NoItemsComponent.module.scss";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
interface INoItemsComponent {
  title: string;
  navigateToPage: () => void;
}

const NoItemsComponent = ({ title, navigateToPage }: INoItemsComponent) => {
  return (
    <div className={styles.noItemsWrapper}>
      <div className={styles.title}>{title}</div>
      <img src={AddPostIcon} alt="Add post icon" />
      <SmallButton
        text={"Create"}
        onClick={navigateToPage}
        color={AvailableIntensiveColors.IntensiveGreen}
        marginTop={"16px"}
      />
    </div>
  );
};
export default NoItemsComponent;
