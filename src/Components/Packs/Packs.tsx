import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    cardsType,
    packsAddTC,
    packsTC,
    setSearchValuePackAC,
    sortPAckAC,
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
    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const totalCount = useSelector<AppStateType, number>(state => state.packs.cardPacksTotalCount)
    const { min, max, page, pageCount, packName, sortPacks } = useSelector<AppStateType, responsePacksType>(state => state.packs)
    const currentPage = useSelector<AppStateType, number>(state => state.packs.page)
    const status = useSelector<AppStateType, string>((state) => state.reg.status)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    useEffect(() => {
        dispatch(packsTC())
    }, [])

    const onPageChanged = (page: number) => {
        dispatch(packsTC(5, 10, page, 10))
    }
    const setSearchResult = (value: string) => {
        dispatch(setSearchValuePackAC(value))
    }
    const searchPackCallback = () => {
        dispatch(packsTC(min, max, page, pageCount, packName, sortPacks))
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
            <div className={s.packsChild}>Name <SortButton sortValue="name" /></div>
            <div className={s.packsChild}>cardsCount<SortButton sortValue="cardsCount" /></div>
            <div className={s.packsChild}>updated<SortButton sortValue="updated" /></div>
            <div className={s.packsChild}>created<SortButton sortValue="created" /></div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(packsAddTC())}>add</button>

            </div>
        </div>

        {packs.map(m => {

            return <Pack card={m} key={m._id} />

        })}
        <Paginator totalItemsCount={totalCount} pageSize={pageCount} currentPage={currentPage} pageCount={pageCount} onPageChanged={onPageChanged} />
    </div>

}