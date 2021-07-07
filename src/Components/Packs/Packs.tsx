import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    sortPackAC,
    packsAddTC,
    packsTC,
    setSearchValuePackAC,
} from "../../Redux/packs-reducer";
import s from "./Packs.module.css"
import { AppStateType } from "../../Redux/store";
import { Search } from '../../Common/Search/Search';
import { Pack } from './Pack/Pack';
import { Paginator } from './../../Common/Paginator/Paginator'
import Preloader from "../../Common/Preloader/Preloader";
import { SortButton } from '../../Common/SortButton/SortButton';
import { responsePacksType } from '../../api/packs-api';

export function Packs() {

    const dispatch = useDispatch()
    const { min, max, page, pageCount, packName, sortPacks, error, cardPacks, cardPacksTotalCount } = useSelector<AppStateType, responsePacksType>(state => state.packs)
    const status = useSelector<AppStateType, string>((state) => state.reg.status)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    useEffect(() => {
        dispatch(packsTC())
    }, [])

    //пагинация
    const onPageChanged = (page: number) => {
        dispatch(packsTC(5, 10, page, 10))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(packsTC(min, max, page, Number(e.currentTarget.value), packName, sortPacks))
    }

    //поисковая строка
    const setSearchResult = (value: string) => {
        dispatch(setSearchValuePackAC(value))
    }
    const searchPackCallback = () => {
        dispatch(packsTC(min, max, page, pageCount, packName, sortPacks))
    }

    //сортировка 
    const sortingPack = (n: 1 | 0, sortPacks: string, sortValue: string) => {
        dispatch(sortPackAC(sortPacks))
        dispatch(packsTC(min, max, page, pageCount, packName, `${n}${sortValue}`))
    }

    return <div className={s.container}>
        PACKS
        {status !== 'idle' ? <Preloader /> : null}
        <br />
        {error && <div>{error}</div>}
        <br />
        <Search packName={packName} inputCallback={setSearchResult} btnCallback={searchPackCallback} />
        <br />
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>Name <SortButton sortValue="name" sortPacks={sortPacks} sortCallback={sortingPack} /></div>
            <div className={s.packsChild}>cardsCount<SortButton sortValue="cardsCount" sortPacks={sortPacks} sortCallback={sortingPack} /></div>
            <div className={s.packsChild}>updated<SortButton sortValue="updated" sortPacks={sortPacks} sortCallback={sortingPack} /></div>
            <div className={s.packsChild}>created<SortButton sortValue="created" sortPacks={sortPacks} sortCallback={sortingPack} /></div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(packsAddTC())}>add</button>

            </div>
        </div>

        {cardPacks.map(m => {

            return <Pack card={m} key={m._id} />

        })}
        <Paginator totalItemsCount={cardPacksTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount} onPageChanged={onPageChanged} onChangeHandler={onChangeHandler} />
    </div>

}