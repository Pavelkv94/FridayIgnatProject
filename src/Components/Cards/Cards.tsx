import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Search } from '../../Common/Search/Search';
import s from "./Cards.module.css"
import { AppStateType } from "../../Redux/store";
import {
    cardsAdd,
    cardsTC,
    setPackUserIdAC,
    setPageCountOfCardsAC,
    setPageOfCardsAC,
    setSearchValueCardAC,
    sortCardAC
} from "../../Redux/cards-reducer";
import { ArrCardType, responseCardType } from "../../api/packs-api";
import { NavLink, useParams } from 'react-router-dom';
import { Paginator } from './../../Common/Paginator/Paginator'
import { SortButton } from '../../Common/SortButton/SortButton';
import { AddedItem } from "../../Modal/AddedModal";
import { authTC } from "../../Redux/login-reducer";
import { Card } from './Card/Card';
import ReplyIcon from '@material-ui/icons/Reply';
import { IconButton } from '@material-ui/core';
import { PATH } from '../../Routes';
import { useCallback } from 'react';

export const Cards = React.memo(() => {

    const dispatch = useDispatch()
    const { packId } = useParams<{ packId: string }>()
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    //const cardsPackId = useSelector<AppStateType, string>(state => state.cards.packUserId)
    const cards = useSelector<AppStateType, Array<ArrCardType>>(state => state.cards.cards)
    const cardsPackID = useSelector<AppStateType, string>(state => state.cards.packUserId)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const { cardsTotalCount, page, pageCount, minGrade, maxGrade, sortCards, cardQuestion } = useSelector<AppStateType, responseCardType>(state => state.cards)

    useEffect(() => {
        if (!isAuth)
            dispatch(authTC())
    }, [isAuth])

    useEffect(() => {
        if (isAuth) {
            dispatch(setPackUserIdAC(packId))
            dispatch(cardsTC(packId))
        }
    }, [isAuth, page, pageCount, sortCards])

    const addCallback = useCallback((question?: string, answer?: string) => {
        dispatch(cardsAdd(packId, question, answer))
    }, [packId])

    //пагинация
    const onPageChanged = useCallback((newPage: number) => {
        dispatch(setPageOfCardsAC(newPage))
    }, [])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountOfCardsAC(Number(e.currentTarget.value)))
    }, [])
    //поиск
    const setSearchResult = useCallback((value: string) => {
        dispatch(setSearchValueCardAC(value))
    }, [])
    const searchCardCallback = useCallback(() => {
        dispatch(cardsTC(packId))
    }, [])

    //сортировка 
    const sortingCard = useCallback((n: 1 | 0, sortValue: string) => {
        dispatch(sortCardAC(n, sortValue))
    }, [])

    return <div className={s.container}>
        <div className={s.subContainer}>
            <div className={s.titleContainer} >
                <div className={s.title}>
                    <NavLink to={PATH.PACKS_PAGE}>  <IconButton >
                        <ReplyIcon titleAccess="Back to Packs" color="secondary" />
                    </IconButton> </NavLink>

                    <h2 className={s.mainTitle}>Cards</h2></div>
                {cardsPackID === userID && <AddedItem disabled={cardsPackID !== userID} callback={addCallback} title="Add New Card" />}

            </div>
            {!error && <div>{error}</div>}
            <div className={s.searchBar}>
                <Search
                    packName={cardQuestion}
                    min={minGrade}
                    max={maxGrade}
                    target="cards"
                    inputCallback={setSearchResult}
                    btnCallback={searchCardCallback}

                /></div>
            <div className={s.cardsTitles}>
                <div className={s.headerItem} style={{ width: "250px" }}>question<SortButton sortValue="question" sortPacks={sortCards}
                    sortCallback={sortingCard} /></div>
                <div className={s.headerItem} style={{ width: "250px" }}>answer<SortButton sortValue="answer" sortPacks={sortCards}
                    sortCallback={sortingCard} /></div>

                <div className={s.headerItem} style={{ width: "100px" }}>updated<SortButton sortValue="updated" sortPacks={sortCards}
                    sortCallback={sortingCard} /></div>
                <div className={s.headerItem} style={{ width: "100px" }}>created<SortButton sortValue="created" sortPacks={sortCards}
                    sortCallback={sortingCard} /></div>
                <div className={s.headerItem} style={{ width: "100px" }}>Grade<SortButton sortValue="grade" sortPacks={sortCards}
                    sortCallback={sortingCard} /></div>
                <div className={s.headerItem} style={{ width: "140px" }}>Actions</div>

            </div>

            {cards.map(m => {
                return <Card card={m} key={m._id} />
            })}

            <div className={s.paginator}>
                <Paginator totalItemsCount={cardsTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount}
                    onPageChanged={onPageChanged} onChangeHandler={onChangeHandler} />
            </div>
        </div>

    </div >

})