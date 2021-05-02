import React, { useState, useEffect } from 'react';
import { Page } from './Pagination';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChange, portionSize }) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  if (pagesCount > 100) { console.log(pagesCount) }
  let [initPortionPage, setInitPortionPage] = useState(1)
  let [rigthLimitPortion, setRigthLimitPortion] = useState(portionSize)

  let availablePages = (currentPage >= portionSize - 2) ? (currentPage + Math.ceil(portionSize / 4)) : portionSize;

  let pages = (currentPage > portionSize - 3) ? (currentPage + Math.ceil(portionSize / 4) - portionSize - 1) : 1;
  let rightLimit = pages + portionSize - 1;

  let listPages = [];


  for (; pages <= rightLimit; pages++) {
    listPages.push(<Page currentPage={currentPage} page={pages} click={onPageChange} />);
  }
  console.log("RENDER");
  const nextPoption = () => {
    console.log(listPages[portionSize - 1].props.page);
    let pages = listPages[portionSize - 1].props.page;
    setInitPortionPage(pages);
    setRigthLimitPortion(pages)
  }

  return (
    <>
      {currentPage > portionSize - 2 && <button >prev</button>}
      {listPages}
      <button onClick={nextPoption}>next</button>
    </>
  )
}
export default Paginator;
