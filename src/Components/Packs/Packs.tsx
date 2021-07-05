import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {cardsType, packsTC} from "../../Redux/packs-reducer";
import s from "./Packs.module.css"
import {AppStateType} from "../../Redux/store";

export function Packs() {

    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs)
    const dispatch = useDispatch()
    return <div>
        PACKS
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>Namesss</div>
            <div className={s.packsChild}>cardsCount</div>
            <div className={s.packsChild}>updated</div>
            <div className={s.packsChild}>url</div>
            <div className={s.packsChild}>
                <button>add</button>
            </div>
        </div>


        {packs.map(m => {
            return <div className={s.packsBodyContainer}>
                <div className={s.packsChild2}>{m.name}</div>
                <div className={s.packsChild2}>{m.cardsCount}</div>
                <div className={s.packsChild2}>{m.updated}</div>
                <div className={s.packsChild2}>{m.url}</div>
                <div className={s.packsChild2}>reserved with buttons</div>
            </div>
        })}


        <button onClick={() => {
            dispatch(packsTC())
        }}>get
        </button>
    </div>
}