import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    cardsType,
    packsDeleteTC,
    packsUpdateTC,
} from "../../../Redux/packs-reducer";
import { AppStateType } from '../../../Redux/store';
import s from "./Pack.module.css"
import { NavLink } from "react-router-dom";
import { UpdateItem } from "../../../Modal/UpdateModal";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import TocTwoToneIcon from '@material-ui/icons/TocTwoTone';
import ShopRoundedIcon from '@material-ui/icons/ShopRounded';

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
        <div className={s.packsChild2} style={{ width: "120px" }}>{props.card.name}</div>
        <div className={s.packsChild2} style={{ width: "80px" }}>{props.card.cardsCount}</div>
        <div className={s.packsChild2} style={{ width: "110px" }}>{props.card.updated.slice(0, 10)}</div>
        <div className={s.packsChild2} style={{ width: "180px" }}>{props.card.user_name}</div>
        <div className={s.packsActions} style={{ width: "100px" }}>
            <IconButton onClick={deleteCallback} disabled={userID !== props.card.user_id}>
                <DeleteForeverIcon />
            </IconButton>
            {/* <DeleteIcon callback={deleteCallback} disabled={userID !== props.card.user_id} /> */}
            <UpdateItem value={props.card.name} callback={updateCallback} disabled={userID !== props.card.user_id} />
            <div>
                <NavLink to={`cards/${props.card._id}`}>
                    <IconButton >
                        <TocTwoToneIcon color="primary" />
                    </IconButton>
                </NavLink>
            </div>
            <NavLink to={`learn/${props.card._id}`}>
                <IconButton >
                    <ShopRoundedIcon color="secondary" />
                </IconButton> </NavLink>
        </div>
    </div>


}