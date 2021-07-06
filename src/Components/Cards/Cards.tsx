import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    cardsType,
    packsAddTC,
    packsDeleteTC,
    packsTC,
    packsUpdateTC,
} from "../../Redux/packs-reducer";
import s from "./Cards.module.css"
import {AppStateType} from "../../Redux/store";
import {cardsAdd, cardsDeleteTC} from "../../Redux/cards-reducer";
import {ArrCardType} from "../../api/packs-api";

export function Cards() {

    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, Array<ArrCardType>>(state => state.cards.cards)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    useEffect(() => {
        dispatch(packsTC())
    }, [])

    return <div>
        PACKS
        {error && <div>{error}</div>}
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>question</div>
            <div className={s.packsChild}>answer</div>
            <div className={s.packsChild}>Grade</div>
            <div className={s.packsChild}>updated</div>
            <div className={s.packsChild}>url</div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(cardsAdd("60e38c5da8b1610004c03d02"))}>add</button>

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
                    {/*<button disabled={userID !== m.user_id}*/}
                    {/*        onClick={() => dispatch(cardsDeleteTC("60e38c5da8b1610004c03d02"))}>del*/}
                    {/*</button>*/}
                    {/*<button disabled={userID !== m.user_id}*/}
                    {/*        onClick={() => dispatch(cardsUpdateTC(m.cardsPack_id, "Hqw"))}>upd*/}
                    {/*</button>*/}
                </div>
            </div>
        })}
    </div>

}