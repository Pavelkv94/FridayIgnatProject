import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Search } from '../../Common/Search/Search';
import s from "./Cards.module.css"
import { AppStateType } from "../../Redux/store";
import { cardsAdd, cardsDeleteTC, cardsTC, cardsUpdateTC, setSearchValueCardAC } from "../../Redux/cards-reducer";
import { ArrCardType, responseCardType } from "../../api/packs-api";
import { useParams } from 'react-router-dom';
import { Paginator } from './../../Common/Paginator/Paginator'

export function Cards() {

    const dispatch = useDispatch()
    const { packId } = useParams<{ packId: string }>()

    const cards = useSelector<AppStateType, Array<ArrCardType>>(state => state.cards.cards)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const { cardsTotalCount, page, pageCount, minGrade, maxGrade, sortCards, cardQuestion } = useSelector<AppStateType, responseCardType>(state => state.cards)

    useEffect(() => {
        dispatch(cardsTC(packId))
    }, [])

    //пагинация
    const onPageChanged = (newPage: number) => {
        dispatch(cardsTC(packId, cardQuestion, minGrade, maxGrade, sortCards, newPage, pageCount))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardsTC(packId, cardQuestion, minGrade, maxGrade, sortCards, page, Number(e.currentTarget.value)))
    }
    //поиск
    const setSearchResult = (value: string) => {
        dispatch(setSearchValueCardAC(value))
    }
    const searchCardCallback = () => {
        dispatch(cardsTC(packId, cardQuestion, minGrade, maxGrade, sortCards, page, pageCount))
    }
    return <div>
        Cards
        {error && <div>{error}</div>}
        <br />
        <Search packName={cardQuestion} inputCallback={setSearchResult} btnCallback={searchCardCallback} />
        <br />
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>question</div>
            <div className={s.packsChild}>answer</div>
            <div className={s.packsChild}>Grade</div>
            <div className={s.packsChild}>updated</div>
            <div className={s.packsChild}>url</div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(cardsAdd(packId))}>add</button>

            </div>
        </div>

        {cards.map(m => {
            return <div className={s.packsBodyContainer}>
                <div className={s.packsChild2}>{m.question}</div>
                <div className={s.packsChild2}>{m.answer}</div>
                <div className={s.packsChild2}>{m.grade}</div>
                <div className={s.packsChild2}>{m.updated}</div>
                <div className={s.packsChild2}>{m.created}</div>
                <div className={s.packsChild2}>
                    <button
                        onClick={() => dispatch(cardsDeleteTC(m._id, m.cardsPack_id))}>del
                    </button>
                    <button disabled={userID !== m.user_id}
                        onClick={() => dispatch(cardsUpdateTC(m._id, m.cardsPack_id))}>upd
                    </button>
                </div>
            </div>
        })}
        <Paginator totalItemsCount={cardsTotalCount} pageSize={pageCount} currentPage={page} pageCount={pageCount} onPageChanged={onPageChanged} onChangeHandler={onChangeHandler} />
    </div>

}