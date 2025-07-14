import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import Pagination from 'react-js-pagination';

const Paginate = (props) => {
    const { activePage, itemsCountPerPage,
        totalItemsCount, pageRangeDisplayed,
        onPageChange } = props;
    const styles = cx('pagination-container', `i${activePage}`);
    return (
        <div className={styles}>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={onPageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
};

export default Paginate;
