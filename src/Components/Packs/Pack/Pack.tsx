import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    cardsType,
    packsDeleteTC,
    packsUpdateTC,
} from "../../../Redux/packs-reducer";
import {AppStateType} from '../../../Redux/store';
import s from "./Pack.module.css"
import {NavLink} from "react-router-dom";
import {DeleteItem} from "../../../Modal/DeleteModal";
import {UpdateItem} from "../../../Modal/UpdateModal";

type PropsType = {
    card: cardsType
}

export function Pack(props: PropsType) {
    const dispatch = useDispatch()

    const deleteCallback = () => {
        dispatch(packsDeleteTC(props.card._id))
    }
    const updateCallback = (name: string) => {
        dispatch(packsUpdateTC(props.card._id, name))
    }

    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)

    return <div className={s.packsBodyContainer} key={props.card._id}>
        <div className={s.packsChild2}>{props.card.name}</div>
        <div className={s.packsChild2}>{props.card.cardsCount}</div>
        <div className={s.packsChild2}>{props.card.updated}</div>
        <div className={s.packsChild2}>{props.card.created}</div>
        <div className={s.packsChild2}>
            <DeleteItem callback={deleteCallback} disabled={userID !== props.card.user_id}/>
            <UpdateItem value={props.card.name} callback={updateCallback} disabled={userID !== props.card.user_id}/>

            <NavLink to={`cards/${props.card._id}`}> cards </NavLink>
            <NavLink to={`learn/${props.card._id}`}> Learn </NavLink>
        </div>
    </div>


}