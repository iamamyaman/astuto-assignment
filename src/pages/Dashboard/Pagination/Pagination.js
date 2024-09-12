import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPaginationRange = () => {
    const totalNumbers = 6; // Maximum number of page buttons to show
    const range = [];
    const siblingsCount = 1; // Number of pages to show before/after the current page

    if (totalPages <= totalNumbers) {
      // Show all pages if total pages are less than or equal to totalNumbers
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const startPage = Math.max(currentPage - siblingsCount, 1);
      const endPage = Math.min(currentPage + siblingsCount, totalPages);

      // Always show the first page
      if (startPage > 2) {
        range.push(1);
        range.push("...");
      } else {
        for (let i = 1; i < startPage; i++) {
          range.push(i);
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      // Always show the last page
      if (endPage < totalPages - 1) {
        range.push("...");
        range.push(totalPages);
      } else {
        for (let i = endPage + 1; i <= totalPages; i++) {
          range.push(i);
        }
      }
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className={styles.Pagination}>
      <div
        className={`${styles.Prev} ${currentPage === 1 ? styles.Disabled : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <div></div>
        Prev
      </div>
      <div className={styles.Pages}>
        {paginationRange.map((page, idx) =>
          page === "..." ? (
            <span key={idx} className={styles.Dots}>
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              className={`${styles.Page} ${
                currentPage === page ? styles.ActivePage : ""
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <div
        className={`${styles.Next} ${
          currentPage === totalPages ? styles.Disabled : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <div></div>
        Next
      </div>
    </div>
  );
};

export default Pagination;
