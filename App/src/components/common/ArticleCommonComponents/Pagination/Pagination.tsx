import ReactPaginate from "react-paginate";
import "./Pagination.scss";
import GreenRightArrow from "public/PostsIcons/GreenRightArrow.svg";
import GreenLeftArrow from "public/PostsIcons/GreenLeftArrow.svg";

interface IPagination {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
}

const Pagination = ({ pageCount, handlePageClick }: IPagination) => {
  return (
    <div id={"pagination"}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<img src={GreenRightArrow} alt={"Right arrow"} />}
        previousLabel={<img src={GreenLeftArrow} alt={"Left arrow"} />}
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Pagination;
