import styles from "./PaginationWrapper.module.css";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

const maxVisiblePages = 5;

export function PaginationWrapper({
  children,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  currentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return <>{children}</>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>

      <div className={styles.pagination}>
        <ChevronLeft
          className={styles.arrowButton}
          onClick={() => handlePageChange(currentPage - 1)}
        />

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((number) => (
            <button
              key={number}
              className={`${styles.pageNumber} ${
                currentPage === number ? styles.activePage : ""
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <ChevronRight
          className={styles.arrowButton}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
}
