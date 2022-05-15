import "./NoItemsComponent.module.scss";
import AddPostIcon from "public/PostsIcons/AddPostIcon.svg";
import styles from "./NoItemsComponent.module.scss";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import NoItemsComponentLogic from "./NoItemsComponentLogic";
interface INoItemsComponent {
  title: string;
}

const NoItemsComponent = ({ title }: INoItemsComponent) => {
  const { navigateToCreatePosts } = NoItemsComponentLogic();
  return (
    <div className={styles.noItemsWrapper}>
      <div className={styles.title}>{title}</div>
      <img src={AddPostIcon} alt="Add post icon" />
      <SmallButton
        text={"Create"}
        onClick={navigateToCreatePosts}
        color={AvailableIntensiveColors.IntensiveGreen}
        marginTop={"16px"}
      />
    </div>
  );
};
export default NoItemsComponent;
