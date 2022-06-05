import styles from "./EduLinksItems.module.scss";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import Pagination from "components/common/ArticleCommonComponents/Pagination/Pagination";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import EduLinkItem from "./EduLinkItem/EduLinkItem";
import EduLinksItemsLogic from "./EduLinksItemsLogic";
import { EduLinkViewModel } from "interfaces/Models/EduLinks/ViewModels/EduLinkViewModel";

interface IEduLinksItems {
  eduLinks: EduLinkViewModel[];
  eduLinkColor: AvailableIntensiveColors;
  paginationColor: AvailablePaginationColors;
}

const EduLinksItems = ({
  eduLinks,
  eduLinkColor,
  paginationColor,
}: IEduLinksItems) => {
  const { handlePageClick, pageCount, currentItems, refContainer } =
    EduLinksItemsLogic({ eduLinks });

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content} ref={refContainer}>
        {currentItems.map((eduLink, index) => (
          <EduLinkItem
            key={`${eduLink.title}, ${eduLink.description} ${index}`}
            eduLink={eduLink}
            eduLinkColor={eduLinkColor}
          />
        ))}
      </div>
      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        colorName={paginationColor}
      />
    </div>
  );
};

export default EduLinksItems;
