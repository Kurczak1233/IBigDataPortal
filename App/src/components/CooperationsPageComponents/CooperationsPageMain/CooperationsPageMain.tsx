import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";
import Pagination from "components/common/ArticleCommonComponents/Pagination/Pagination";
import CooperationsPageMainLogic from "./CooperationsPageMainLogic";
import styles from "./CooperationsPageMain.module.scss";
import CooperationsPageHeader from "../CooperationsPageHeader/CooperationsPageHeader";
import CooperationsPageItem from "../CooperationsPageMainItem/CooperationsPageItem";

const CooperationsPageMain = () => {
  const {
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
    showArchived,
  } = CooperationsPageMainLogic();

  return (
    <>
      <CooperationsPageHeader />
      <div className={styles.contentContainer}>
        <div className={styles.content} ref={refContainer}>
          {currentItems.map((item) => {
            if (item.isArchived && showArchived) {
              return (
                <CooperationsPageItem
                  key={item.id}
                  cooperation={item}
                  archived={item.isArchived}
                />
              );
            }
            if (!showArchived && !item.isArchived) {
              return (
                <CooperationsPageItem
                  key={item.id}
                  cooperation={item}
                  archived={item.isArchived}
                />
              );
            }
            return <div key={item.id} />;
          })}
        </div>
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          colorName={AvailablePaginationColors.green}
        />
      </div>
    </>
  );
};

export default CooperationsPageMain;
