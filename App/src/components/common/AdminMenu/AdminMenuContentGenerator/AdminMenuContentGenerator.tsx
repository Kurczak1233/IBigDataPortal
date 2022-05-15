import BigButton from "components/common/Buttons/BigButtons/BigButton";
import { IAdminMenuContentArray } from "components/PostsPage/Interfaces/IAdminMenuContentArray";
import { IAdminMenuContentItem } from "components/PostsPage/Interfaces/IAdminMenuContentItem";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import styles from "./AdminMenuContentGenerator.module.scss";

//Generic type should allow us to manipulate different component rendering enums.
interface IAdminMenuContentGenerator<T> {
  tableOfContents: IAdminMenuContentArray<T>;
  handleChangeState: (selectedEnum: T) => void;
  marginTop?: string;
  marginBottom?: string;
}

const AdminMenuContentGenerator = <T,>({
  tableOfContents,
  marginBottom,
  marginTop,
  handleChangeState,
}: IAdminMenuContentGenerator<T>) => {
  return (
    <div
      className={styles.sectionWrapper}
      style={{ marginTop: marginTop, marginBottom: marginBottom }}
    >
      <div className={styles.sectionTitle}>{tableOfContents.sectionName}</div>
      {tableOfContents.items.map((item: IAdminMenuContentItem<T>) => (
        <>
          <BigButton
            text={item.itemName}
            onClick={() => handleChangeState(item.switchTo)}
            key={item.itemName}
            height={"33px"}
            width={"140px"}
            marginTop={"16px"}
            color={
              item.isActive
                ? AvailableIntensiveColors.IntensiveOrange
                : AvailableIntensiveColors.IntensiveGreen
            }
          />
        </>
      ))}
    </div>
  );
};
export default AdminMenuContentGenerator;
