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
    setAllCooperations,
  } = CooperationsPageMainLogic();

  return (
    <>
      <CooperationsPageHeader />
      <div className={styles.contentContainer}>
        <div className={styles.content} ref={refContainer}>
          {currentItems.map((item) => {
            return (
              <CooperationsPageItem
                key={item.id}
                setAllCooperations={setAllCooperations}
                cooperation={item}
              />
            );
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
