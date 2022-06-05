import NoItemsComponent from "components/common/ArticleCommonComponents/NoItemsComponent/NoItemsComponent";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";
import EduLinksContentLogic from "./EduLinksContentLogic";
import styles from "./EduLinksContent.module.scss";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import EduLinksHeader from "../EduLinksHeader/EduLinksHeader";
import EduLinksItems from "../EduLinksItems/EduLinksItems";

interface IEduLinksContent {
  eduLinks: EduLinkViewModel[];
}

const EduLinksContent = ({ eduLinks }: IEduLinksContent) => {
  const { navigateToCreateEduLink } = EduLinksContentLogic();
  return (
    <>
      {eduLinks.length === 0 ? (
        <NoItemsComponent
          title={"There are no job offers"}
          navigateToPage={navigateToCreateEduLink}
        />
      ) : (
        <>
          <div className={styles.title}>Overview posts</div>
          <EduLinksHeader
            iconsColour={AvailableIntensiveColors.IntensiveGreen}
          />
          <EduLinksItems
            eduLinks={eduLinks}
            eduLinkColor={AvailableIntensiveColors.LessIntensiveGreen}
            paginationColor={AvailablePaginationColors.green}
          />
        </>
      )}
    </>
  );
};

export default EduLinksContent;
