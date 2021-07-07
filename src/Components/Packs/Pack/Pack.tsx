import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    cardsType,
    packsAddTC,
    packsDeleteTC,
    packsTC,
    packsUpdateTC,
} from "../../../Redux/packs-reducer";
import { AppStateType } from '../../../Redux/store';
import s from "./Pack.module.css"

type PropsType = {
   card: cardsType
}

export function Pack(props: PropsType) {
    const dispatch = useDispatch()
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)

    return <div className={s.packsBodyContainer} key={props.card._id}>
        <div className={s.packsChild2}>{props.card.name}</div>
        <div className={s.packsChild2}>{props.card.cardsCount}</div>
        <div className={s.packsChild2}>{props.card.updated}</div>
        <div className={s.packsChild2}>{props.card.created}</div>
        <div className={s.packsChild2}>
            <button disabled={userID !== props.card.user_id}
                onClick={() => dispatch(packsDeleteTC(props.card._id))}>del
            </button>
            <button disabled={userID !== props.card.user_id}
                onClick={() => dispatch(packsUpdateTC(props.card._id, "Hqw"))}>upd
            </button>
        </div>
    </div>


}