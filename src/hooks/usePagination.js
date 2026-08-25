import { useState, useMemo } from 'react';

const usePagination = ({ totalItems = 0, initialPage = 1, pageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pagination = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    return { start, end, currentPage, totalPages, itemsPerPage, totalItems };
  }, [currentPage, itemsPerPage, totalItems, totalPages]);

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const firstPage = () => goToPage(1);
  const lastPage = () => goToPage(totalPages);

  const changePageSize = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  return {
    ...pagination,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize,
    canNext: currentPage < totalPages,
    canPrev: currentPage > 1,
  };
};

export default usePagination;
