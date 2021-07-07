import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import s from "./Cards.module.css"
import { AppStateType } from "../../Redux/store";
import { cardsAdd, cardsDeleteTC, cardsTC, cardsUpdateTC } from "../../Redux/cards-reducer";
import { ArrCardType } from "../../api/packs-api";
import { useParams } from 'react-router-dom';

export function Cards() {

    const dispatch = useDispatch()
    const { packId } = useParams<{ packId: string }>()

    console.log(packId)
    const cards = useSelector<AppStateType, Array<ArrCardType>>(state => state.cards.cards)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)

    useEffect(() => {
        dispatch(cardsTC(packId))
    }, [])

    return <div>
        Cards
        {error && <div>{error}</div>}
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
    </div>

}