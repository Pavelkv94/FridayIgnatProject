import React, { useCallback } from 'react';
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
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

type PropsType = {
    card: cardsType
}

export const Pack = React.memo((props: PropsType) => {
    console.log("render pack")
    const dispatch = useDispatch()

    const deleteCallback = useCallback(() => {
        dispatch(packsDeleteTC(props.card._id))
    }, [props.card._id])
    const updateCallback = useCallback((name: string) => {
        dispatch(packsUpdateTC(props.card._id, name))
    }, [props.card._id])

    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)

    return <div className={s.packsBodyContainer} key={props.card._id}>
        <div className={s.packsChild2} style={{ width: "120px" }}>{props.card.name}</div>
        <div className={s.packsChild2} style={{ width: "80px" }}>{props.card.cardsCount}</div>
        <div className={s.packsChild2} style={{ width: "110px" }}>{props.card.updated.slice(0, 10)}</div>
        <div className={s.packsChild2} style={{ width: "180px" }}>{props.card.user_name}</div>
        <div className={s.packsActions} style={{ width: "100px" }}>
            <IconButton onClick={deleteCallback} disabled={userID !== props.card.user_id}>
                <DeleteForeverIcon titleAccess="Delete pack" />
            </IconButton>
            {/* <DeleteIcon callback={deleteCallback} disabled={userID !== props.card.user_id} /> */}
            <UpdateItem value={props.card.name} callback={updateCallback} disabled={userID !== props.card.user_id} />
            <div>
                <NavLink to={`cards/${props.card._id}`}>
                    <IconButton >
                        <TocTwoToneIcon color="primary" titleAccess="Show cards" />
                    </IconButton>
                </NavLink>
            </div>
            <NavLink to={`learn/${props.card._id}`}>
                <IconButton >
                    <PlayCircleOutlineIcon color="secondary" titleAccess="Go to Learn" />
                </IconButton> </NavLink>
        </div>
    </div>


})