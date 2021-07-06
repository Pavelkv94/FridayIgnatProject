import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    cardsType,
    packsAddTC,
    packsDeleteTC,
    packsTC,
    packsUpdateTC,
} from "../../Redux/packs-reducer";
import s from "./Packs.module.css"
import { AppStateType } from "../../Redux/store";
import { authTC, isLoggedInAC } from "../../Redux/login-reducer";
import { Search } from '../../Common/Search/Search';


export function Packs() {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    useEffect(() => {
        dispatch(packsTC())
    }, [])

    return <div>
        PACKS
        <br />
        {error && <div>{error}</div>}
        <br />
        <Search />
        <br />
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>Namesss</div>
            <div className={s.packsChild}>cardsCount</div>
            <div className={s.packsChild}>updated</div>
            <div className={s.packsChild}>url</div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(packsAddTC())}>add</button>

            </div>
        </div>

        {packs.map(m => {
            return <div className={s.packsBodyContainer} key={m._id}>
                <div className={s.packsChild2}>{m.name}</div>
                <div className={s.packsChild2}>{m.cardsCount}</div>
                <div className={s.packsChild2}>{m.updated}</div>
                <div className={s.packsChild2}>{m.url}</div>
                <div className={s.packsChild2}>
                    <button disabled={userID !== m.user_id}
                        onClick={() => dispatch(packsDeleteTC(m._id))}>del
                    </button>
                    <button disabled={userID !== m.user_id}
                        onClick={() => dispatch(packsUpdateTC(m._id, "Hqw"))}>upd
                    </button>
                </div>
            </div>
        })}
    </div>

}