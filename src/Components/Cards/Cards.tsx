import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Search} from '../../Common/Search/Search';
import s from "./Cards.module.css"
import {AppStateType} from "../../Redux/store";
import {
    cardsAdd,
    cardsDeleteTC,
    cardsTC,
    cardsUpdateTC,
    setPackUserIdAC,
    setPageCountOfCardsAC,
    setPageOfCardsAC,
    setSearchValueCardAC,
    sortCardAC
} from "../../Redux/cards-reducer";
import {ArrCardType, responseCardType} from "../../api/packs-api";
import {useParams} from 'react-router-dom';
import {Paginator} from './../../Common/Paginator/Paginator'
import {SortButton} from '../../Common/SortButton/SortButton';
import {DeleteItem} from "../../Modal/DeleteModal";
import {UpdateItem} from "../../Modal/UpdateModal";
import {AddedItem} from "../../Modal/AddedModal";

export function Cards() {

    const dispatch = useDispatch()
    const {packId} = useParams<{ packId: string }>()
    //const cardsPackId = useSelector<AppStateType, string>(state => state.cards.packUserId)
    const cards = useSelector<AppStateType, Array<ArrCardType>>(state => state.cards.cards)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const {cardsTotalCount, page, pageCount, minGrade, maxGrade, sortCards, cardQuestion} = useSelector<AppStateType, responseCardType>(state => state.cards)

    useEffect(() => {
        dispatch(setPackUserIdAC(packId))
        dispatch(cardsTC(packId))
    }, [page, pageCount, sortCards])

    const addCallback = (question?: string, answer?: string) => {
        dispatch(cardsAdd(packId, question, answer))
    }

    //пагинация
    const onPageChanged = (newPage: number) => {
        dispatch(setPageOfCardsAC(newPage))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageCountOfCardsAC(Number(e.currentTarget.value)))
    }
    //поиск
    const setSearchResult = (value: string) => {
        dispatch(setSearchValueCardAC(value))
    }
    const searchCardCallback = () => {
        dispatch(cardsTC(packId))
    }

    //сортировка 
    const sortingCard = (n: 1 | 0, sortValue: string) => {
        dispatch(sortCardAC(n, sortValue))
    }

    return <div>
        Cards
        {error && <div>{error}</div>}
        <br/>
        <Search
            packName={cardQuestion}
            min={minGrade}
            max={maxGrade}
            target="cards"
            inputCallback={setSearchResult}
            btnCallback={searchCardCallback}

        />
        <br/>
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>question<SortButton sortValue="question" sortPacks={sortCards}
                                                              sortCallback={sortingCard}/></div>
            <div className={s.packsChild}>answer<SortButton sortValue="answer" sortPacks={sortCards}
                                                            sortCallback={sortingCard}/></div>
            <div className={s.packsChild}>Grade<SortButton sortValue="grade" sortPacks={sortCards}
                                                           sortCallback={sortingCard}/></div>
            <div className={s.packsChild}>updated<SortButton sortValue="updated" sortPacks={sortCards}
                                                             sortCallback={sortingCard}/></div>
            <div className={s.packsChild}>created<SortButton sortValue="created" sortPacks={sortCards}
                                                             sortCallback={sortingCard}/></div>
            <AddedItem callback={addCallback}/>
            {/*<div className={s.packsChild}>*/}
            {/*    <button onClick={addCallback}>add</button>*/}

            {/*</div>*/}
        </div>

        {cards.map(m => {
            const deleteCallback = () => {
                dispatch(cardsDeleteTC(m._id, m.cardsPack_id))
            }
            const updateCallback = (question: string) => {
                dispatch(cardsUpdateTC(m._id, m.cardsPack_id, question))
            }
            return <div className={s.packsBodyContainer}>
                <div className={s.packsChild2}>{m.question}</div>
                <div className={s.packsChild2}>{m.answer}</div>
                <div className={s.packsChild2}>{m.grade}</div>
                <div className={s.packsChild2}>{m.updated}</div>
                <div className={s.packsChild2}>{m.created}</div>
                <div className={s.packsChild2}>
                    <DeleteItem disabled={userID !== m.user_id} callback={deleteCallback}/>
                    <UpdateItem callback={updateCallback}
                                value={m.question}
                        // value2 = {m.answer}
                                disabled={userID !== m.user_id}/>
                    {/*<button disabled={userID !== m.user_id}*/}
                    {/*    onClick={updateCallback()}>upd)*/}
                    {/*</button>*/}
                </div>
            </div>
        })}
        <Paginator totalItemsCount={cardsTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount}
                   onPageChanged={onPageChanged} onChangeHandler={onChangeHandler}/>
    </div>

}