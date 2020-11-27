import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Wrapper } from './styles';
import { Pagination } from 'react-bootstrap';

const PaginationComponent: React.FC<PropsType> = ({ data, setChunkOfData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(itemsPerPage ? itemsPerPage : 6);
  const [pageItemsToShow, setPageItemsToShow] = useState([1, 2, 3, 4, 5]);

  const indexOfLastCard = useMemo(() => currentPage * cardsPerPage, [cardsPerPage, currentPage]);
  const indexOfFirstCard = useMemo(() => indexOfLastCard - cardsPerPage, [cardsPerPage, indexOfLastCard]);
  const currentCards = useMemo(() => data.slice(indexOfFirstCard, indexOfLastCard), [data, indexOfFirstCard, indexOfLastCard]);
  const totalPagesCount = useMemo(() => Math.ceil(data.length / cardsPerPage), [cardsPerPage, data.length]);

  useEffect(() => {
    setChunkOfData(currentCards);
  }, [currentCards, setChunkOfData]);

  const ellipsisClickHandler = useCallback(
    (arrowDirection: number) => {
      setPageItemsToShow((prevState: number[]) => {
        let start: number;
        let end: number;
        if (arrowDirection < 0) {
          end = prevState[0];
          start = end - 4;
        } else {
          start = prevState[prevState.length - 1];
          end = start + 4;
        }
        if (start < 1 || end < 1) {
          start = 1;
          end = 5 < totalPagesCount ? 5 : totalPagesCount;
        } else if (end > totalPagesCount) {
          end = totalPagesCount;
          start = totalPagesCount - 4 > 1 ? totalPagesCount - 4 : 1;
        }
        const list = [];
        if (start > end) [start, end] = [end, start];
        setCurrentPage(arrowDirection > 0 ? start : end);
        for (let i = start; i <= end; i++) list.push(i);
        return list;
      });
    },
    [totalPagesCount]
  );

  const arrowClickHandler = useCallback(
    (arrowDirection: number) => {
      if (currentPage + arrowDirection < 1 || currentPage + arrowDirection > totalPagesCount) return;
      setCurrentPage(currentPage + arrowDirection);
      if (!pageItemsToShow.includes(currentPage + arrowDirection)) ellipsisClickHandler(arrowDirection);
    },
    [currentPage, ellipsisClickHandler, pageItemsToShow, totalPagesCount]
  );

  const pageNumbers = useMemo(() => {
    const result = [];
    for (let i = 1; i <= totalPagesCount; i++) {
      result.push(i);
    }
    return result;
  }, [totalPagesCount]);

  return (
    <Wrapper>
      <Pagination>
        <Pagination.Prev draggable='false' disabled={currentPage === 1} onClick={() => arrowClickHandler(-1)} />
        {pageItemsToShow[0] > 1 && <Pagination.Ellipsis draggable='false' onClick={() => ellipsisClickHandler(-1)} />}
        {pageNumbers.map(
          (pageNumber: number) =>
            pageItemsToShow.includes(pageNumber) && (
              <Pagination.Item
                draggable='false'
                onClick={() => setCurrentPage(pageNumber)}
                key={pageNumber}
                active={pageNumber === currentPage}>
                {pageNumber}
              </Pagination.Item>
            )
        )}
        {pageItemsToShow[pageItemsToShow.length - 1] < totalPagesCount && (
          <Pagination.Ellipsis draggable='false' onClick={() => ellipsisClickHandler(1)} />
        )}
        <Pagination.Next draggable='false' disabled={currentPage === totalPagesCount} onClick={() => arrowClickHandler(1)} />
      </Pagination>
    </Wrapper>
  );
};

export default PaginationComponent;

interface PropsType {
  data: any[];
  itemsPerPage?: number;
  setChunkOfData: (chunk: any[]) => void;
}
