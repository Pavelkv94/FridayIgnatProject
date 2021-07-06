import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    cardsType,
    packsAddTC,
    packsTC,
    sortPAckAC,
} from "../../Redux/packs-reducer";
import s from "./Packs.module.css"
import { AppStateType } from "../../Redux/store";
import { Search } from '../../Common/Search/Search';
import { Pack } from './Pack/Pack';
import { Paginator } from './../../Common/Paginator/Paginator'
import Preloader from "../../Common/Preloader/Preloader";
import { SortButton } from '../../Common/SortButton/SortButton';

export function Packs() {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const searchResult = useSelector<AppStateType, string>(state => state.packs.packName)
    const totalCount = useSelector<AppStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStateType, number>(state => state.packs.pageCount)
    const currentPage = useSelector<AppStateType, number>(state => state.packs.page)
    const status = useSelector<AppStateType, string>((state) => state.reg.status)
   

    useEffect(() => {
        dispatch(packsTC())
    }, [])


    const searchName = (name: string, search: string) => {
        if (name.toLowerCase() === search.toLowerCase()) return true
    }

    let searchPacks = packs

    // if (searchResult) {
    //     searchPacks = packs.filter(m => searchName(m.name, searchResult))
    // }

    const onPageChanged = (page: number) => {
        dispatch(packsTC(5, 10, page, 10))
    }
    console.log("render PACKS")

    return <div className={s.container}>
        PACKS
        {status !== 'idle' ? <Preloader /> : null}
        <br />
        {error && <div>{error}</div>}
        <br />
        <Search />
        <br />
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>Name <SortButton  /></div>
            <div className={s.packsChild}>cardsCount<SortButton  /></div>
            <div className={s.packsChild}>updated<SortButton  /></div>
            <div className={s.packsChild}>url<SortButton  /></div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(packsAddTC())}>add</button>

            </div>
        </div>

        {searchPacks.map(m => {
            return <Pack card={m} key={m._id} />
        })}
        <Paginator totalItemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
    </div>

}