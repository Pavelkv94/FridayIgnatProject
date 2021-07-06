import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { packsTC, sortPAckAC } from '../../Redux/packs-reducer';
import { AppStateType } from '../../Redux/store';
import s from './SortButton.module.css'


export const SortButton: React.FC<any> = () => {

    //const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const dispatch = useDispatch();
    const sortValue = useSelector<AppStateType, string>((state) => state.packs.sortPacks)
    const { min, max, page, pageCount, packName } = useSelector<AppStateType, any>(state => state.packs)
    const sorting = (n: 1 | 0) => {

        dispatch(sortPAckAC(sortValue))
        dispatch(packsTC(min, max, page, pageCount, packName, `${n}cardsCount`))
        console.log("click")
    }

    return (
        <div className={s.container}>
            <button onClick={() => sorting(1)}>&#5123;</button>
            <button onClick={() => sorting(0)}>&#5121;</button>
        </div>
    )
};







