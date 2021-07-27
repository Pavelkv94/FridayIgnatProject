import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    sortPackAC,
    packsAddTC,
    packsTC,
    setSearchValuePackAC,
    setPageOfPacksAC,
    setPageCountOfPacksAC,
    setUserIdforPacksAC,
} from "../../Redux/packs-reducer";
import s from "./Packs.module.css"
import { AppStateType } from "../../Redux/store";
import { Search } from '../../Common/Search/Search';
import { Pack } from './Pack/Pack';
import { Paginator } from '../../Common/Paginator/Paginator'
import { SortButton } from '../../Common/SortButton/SortButton';
import { responsePacksType } from '../../api/packs-api';
import { Redirect } from 'react-router-dom';
import { AddedItem } from "../../Modal/AddedModal";
import { authTC } from '../../Redux/login-reducer';
import { useState } from 'react';

export const Packs = React.memo(() => {
    let [my, setMy] = useState<boolean>();

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const isAuthError = useSelector<AppStateType, string | null>(state => state.loginPage.error)
    const { min, max, page, pageCount, packName, sortPacks, error, cardPacks, cardPacksTotalCount, user_id } = useSelector<AppStateType, responsePacksType>(state => state.packs)
    const isOwner = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const own = useSelector<AppStateType, string>(state => state.packs.user_id)

    useEffect(() => {
        setMy(isOwner === own)
    }, [isOwner, own])
    useEffect(() => {
        if (!isAuth)
            dispatch(authTC())
    }, [isAuth, dispatch])

    useEffect(() => {
        if (isAuth)
            dispatch(packsTC())
    }, [isAuth, page, pageCount, sortPacks, user_id, dispatch])

    const addedCallback = useCallback((name: string) => {
        dispatch(packsAddTC(name))
    }, [dispatch])

    //пагинация
    const onPageChanged = useCallback((page: number) => {
        dispatch(setPageOfPacksAC(page))
    }, [dispatch])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountOfPacksAC(Number(e.currentTarget.value)))
    }, [dispatch])

    //поисковая строка
    const setSearchResult = useCallback((value: string) => {
        dispatch(setSearchValuePackAC(value))
    }, [dispatch])
    const searchPackCallback = useCallback(() => {
        dispatch(packsTC())
    }, [dispatch])

    //сортировка 
    const sortingPack = useCallback((n: 1 | 0, sortValue: string) => {

        dispatch(sortPackAC(n, sortValue))
    }, [dispatch])




    if (isAuthError) { return <Redirect to={"/login"} />; }

    return <div className={s.container}>
        {!error && <div>{error}</div>}
        <div className={s.leftBlock}>
            <p className={s.titleOfLeftMenu}>Show packs cards</p>
            <div className={s.btnBlock}>
                <div className={`${s.btnOfLeftMenu} ${my && s.active}`} onClick={() => { dispatch(setUserIdforPacksAC(isOwner)); setMy(true) }}>My</div>
                <div className={`${s.btnOfLeftMenu} ${!my && s.active}`} onClick={() => { dispatch(setUserIdforPacksAC("")); setMy(false) }}>All</div>
            </div>
            {my && <div className={s.addBtn}>
                <AddedItem callback={addedCallback} title="Add New Pack" />
            </div>}

        </div>

        <div className={`${s.mainBlock} ${pageCount < 11 ? s.ten : s.twenty}`} >
            <h2 className={s.mainTitle}>Packs list</h2>
            <div className={s.searchBar}>
                <Search
                    packName={packName}
                    min={min}
                    max={max ? max : 10}
                    target="packs"
                    inputCallback={setSearchResult}
                    btnCallback={searchPackCallback}
                />
            </div>


            <div className={s.packsTitles}>
                <div className={s.headerItem} style={{ width: "140px" }}>Name <SortButton sortValue="name" sortPacks={sortPacks}
                    sortCallback={sortingPack} /></div>
                <div className={s.headerItem} style={{ width: "80px" }}>Cards<SortButton sortValue="cardsCount" sortPacks={sortPacks}
                    sortCallback={sortingPack} /></div>
                <div className={s.headerItem} style={{ width: "120px" }}>Last Updated<SortButton sortValue="updated" sortPacks={sortPacks}
                    sortCallback={sortingPack} /></div>
                <div className={s.headerItem} style={{ width: "200px" }}>Created By<SortButton sortValue="user_name" sortPacks={sortPacks}
                    sortCallback={sortingPack} /></div>
                <div className={s.headerItem} style={{ width: "100px" }}>Actions</div>
            </div>
            <div className={s.packs}>
                {cardPacks.map(m => {

                    return <Pack card={m} key={m._id} />

                })}
                <div className={s.paginator}>
                    <Paginator totalItemsCount={cardPacksTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount}
                        onPageChanged={onPageChanged} onChangeHandler={onChangeHandler} />
                </div>
            </div>


        </div>

    </div >

})