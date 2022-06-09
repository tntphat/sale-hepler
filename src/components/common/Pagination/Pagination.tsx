import React, { useMemo } from 'react';
import { SvgAngle } from '../../../assets/svg';

import './Pagination.scss';

export const calcArrPagination = (
  curPage: number,
  quantityPaginationDisplay: number,
  totalPages: number,
) => {
  const pagination: Array<number> = [curPage];
  let count = 1;
  while (pagination.length < quantityPaginationDisplay && count < quantityPaginationDisplay) {
    if (curPage + count <= totalPages) pagination.push(curPage + count);
    if (curPage - count > 0) pagination.unshift(curPage - count);

    count++;
  }

  return pagination;
};

console.log(calcArrPagination(1, 5, 32));

export const Pagination: React.FC<any> = ({ page, totalPages, setPage }) => {
  const memoizedPaginations = useMemo(() => {
    return calcArrPagination(page, 5, totalPages);
  }, [page, totalPages]);
  return (
    <div className="pagination">
      <span
        className={page === 1 ? 'disable' : 'active'}
        onClick={() => !(page === 1) && setPage((pre) => pre - 1)}
      >
        <SvgAngle />
      </span>
      {memoizedPaginations.map((item) => (
        <span onClick={() => setPage(item)} key={item} className={item === page ? 'active' : ''}>
          {item}
        </span>
      ))}
      {!memoizedPaginations.includes(totalPages) ? (
        <>
          <span>...</span>
          <span onClick={() => setPage(totalPages)}>{totalPages}</span>
        </>
      ) : null}
      <span
        className={page === totalPages ? 'disable' : 'active'}
        onClick={() => !(page === totalPages) && setPage((pre) => pre + 1)}
      >
        <SvgAngle />
      </span>
    </div>
  );
};
