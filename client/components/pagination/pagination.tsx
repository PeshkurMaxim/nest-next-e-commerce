import { PaginationProps } from '@/interfaces/pagination/pagination';
import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import styles from './pagination.module.css';

export default function Pagination(props: PaginationProps) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.container}>
      <li className={`${styles.item} ${currentPage === 1 ? styles.disabled : ''}`} onClick={onPrevious}><div className={`${styles.arrow} ${styles.left}`} /></li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={pageNumber} className={styles.item}>&#8230;</li>;
        }

        return (
          <li key={pageNumber} className={`${styles.item} ${pageNumber === currentPage ? styles.selected : ''}`} onClick={() => onPageChange(Number(pageNumber))}>{pageNumber}</li>
        );
      })}
      <li className={`${styles.item} ${currentPage === lastPage ? styles.disabled : ''}`} onClick={onNext}><div className={`${styles.arrow} ${styles.right}`}/></li>
    </ul>
  );
}