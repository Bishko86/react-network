import React, { useState } from 'react';
import Pagination from "react-js-pagination";
import style from './Pagination.module.css'

export const Page = (props) => {
    let curPage = props.currentPage === props.page ? 'red' : 'grey';
    return <span style={{ marginLeft: 5 + 'px', color: curPage }} id={props.page} onClick={props.click}>{props.page}</span>
}

const PaginationPage = (props) => {

    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        props.getUsers(pageNumber, 5);
    }
    return (
        <div>
            <Pagination activeClass={style.active}
                activeLinkClass={style.active}
                innerClass={style.paginationBlock}
                itemClass={style.li}
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={props.allUsers}
                pageRangeDisplayed={15}
                onChange={handlePageChange}
            />
        </div>
    );

}

export default PaginationPage;