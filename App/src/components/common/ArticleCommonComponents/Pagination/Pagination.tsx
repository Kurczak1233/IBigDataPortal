import ReactPaginate from "react-paginate";
import "./Pagination.scss";

import { AvailablePaginationColors } from "./AvailablePaginationColors";
import PaginationLogic from "./PaginationLogic";

interface IPagination {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
  colorName: AvailablePaginationColors;
}

const Pagination = ({ pageCount, handlePageClick, colorName }: IPagination) => {
  const { getAppropriateIcons } = PaginationLogic();
  const icons = getAppropriateIcons(colorName);
  return (
    <div id={"pagination"} className={`${colorName}`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          pageCount > 0 && <img src={icons.iconRight} alt={"Right arrow"} />
        }
        previousLabel={
          pageCount > 0 && <img src={icons.iconLeft} alt={"Left arrow"} />
        }
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Pagination;
