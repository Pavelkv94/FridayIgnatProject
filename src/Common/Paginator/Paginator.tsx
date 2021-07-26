import { ChangeEvent, useState } from 'react';
import s from './Paginator.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';

type PaginatorType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    pageCount: number
    profileView?: boolean
    onPageChanged: (pageNumber: number) => void
    onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void
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
        <span className={s.pagTitle}>Show</span>
        <select value={props.pageCount} onChange={(e) => props.onChangeHandler(e)} >
            <option value={4}>4</option>
            <option value={7}>7</option>
            {!props.profileView && <option value={10}>10</option>}
            {!props.profileView && <option value={25}>25</option>}
        </select>
        <span className={s.pagTitle}>Cards per Page   </span>
        {portionNumber > 1 &&
            <IconButton onClick={() => { setPortionNumber(portionNumber - 1) }} >
                <ArrowBackIcon color="secondary" fontSize="medium" />
            </IconButton>

        }
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
            return <span key={Math.random()}
                className={props.currentPage === p ? s.selected : s.paginat}
                onClick={() => props.onPageChanged(p)}
            >{p}</span>
        })}
        {portionCount > portionNumber &&
            <IconButton onClick={() => { setPortionNumber(portionNumber + 1) }} >
                <ArrowForwardIcon color="secondary" fontSize="medium" />
            </IconButton>
        }

    </div>)
}









