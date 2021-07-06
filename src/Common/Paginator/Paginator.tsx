import { useState } from 'react';
import s from './Paginator.module.css'

type PaginatorType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export function Paginator(props: PaginatorType) {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionSize = 5;
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (<div className={s.container}>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
            return <span
                className={props.currentPage === p ? s.selected : s.paginat}
                onClick={() => props.onPageChanged(p)}
            >{p}</span>
        })}
        {portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        

    </div>)
}









