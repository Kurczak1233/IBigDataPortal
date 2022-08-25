import Pagination from "components/common/ArticleCommonComponents/Pagination/Pagination";
import UsersPageMainHeader from "../UsersPageMainHeader/UsersPageMainHeader";
import UsersPageMainItem from "../UsersPageMainItem/UsersPageMainItem";
import UsersPageMainLogic from "./UsersPageMainLogic";
import styles from "./UsersPageMain.module.scss";
import { AvailablePaginationColors } from "components/common/ArticleCommonComponents/Pagination/AvailablePaginationColors";

const UsersPageMain = () => {
  const {
    setAllPortalUsers,
    handlePageClick,
    pageCount,
    currentItems,
    refContainer,
  } = UsersPageMainLogic();
  return (
    <>
      <UsersPageMainHeader />
      <div className={styles.contentContainer}>
        <div className={styles.content} ref={refContainer}>
          {currentItems.map((item) => {
            return (
              <UsersPageMainItem
                key={item.id}
                user={item}
                setAllPortalUsers={setAllPortalUsers}
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

export default UsersPageMain;
