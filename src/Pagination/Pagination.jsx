import { useEffect, useState } from "react";
import "./Pagination.scss";

export const Pagination = ({
  dataPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const totalPages = Math.ceil(totalPosts / dataPerPage);

  useEffect(() => {
    let pageArray = [];
    if (totalPages <= 10) {
      pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 5) {
        pageArray = [
          ...Array.from({ length: 5 }, (_, i) => i + 1),
          "...",
          totalPages,
        ];
      } else if (currentPage >= totalPages - 4) {
        // If current page is near the end
        pageArray = [
          1,
          "...",
          ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i),
        ];
      } else {
        // If current page is in the middle
        pageArray = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    setPageNumbers(pageArray);
  }, [totalPosts, currentPage]);

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <div className="pagination">
        <button
          onClick={(e) => paginate(currentPage - 1, e)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <div
              onClick={(e) => number != "..." && paginate(number, e)}
              href="!#"
              className="page-link"
            >
              {number}
            </div>
          </div>
        ))}
        <button
          onClick={(e) => paginate(currentPage + 1, e)}
          disabled={currentPage === Math.ceil(totalPosts / dataPerPage)}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
