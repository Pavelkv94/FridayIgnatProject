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
import { Pack } from './Pack/Pack';


export function Packs() {

    const dispatch = useDispatch()

    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const error = useSelector<AppStateType, string | undefined>(state => state.packs.error)
    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const searchResult = useSelector<AppStateType, string | null>(state => state.packs.searchResult)

    useEffect(() => {
        dispatch(packsTC())
    }, [])

    let sortedPacks = packs
console.log(sortedPacks)
console.log(searchResult)
    if (searchResult) {
        sortedPacks = packs.filter(m=>m.name === searchResult)
    }



    return <div>
        PACKS
        <br />
        {error && <div>{error}</div>}
        <br />
        <Search />
        <br />
        <div className={s.packsHeaderContainer}>
            <div className={s.packsChild}>Name</div>
            <div className={s.packsChild}>cardsCount</div>
            <div className={s.packsChild}>updated</div>
            <div className={s.packsChild}>url</div>
            <div className={s.packsChild}>
                <button onClick={() => dispatch(packsAddTC())}>add</button>

            </div>
        </div>

        {sortedPacks.map(m => {
            return <Pack card={m} key={m._id}/>
        })}
    </div>

}