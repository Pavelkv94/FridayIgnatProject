import React, { useEffect } from 'react';
import Range from './Range/Range'
import s from './Search.module.css'
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { AppStateType } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { cardsType, packsTC, setSearchValuePackAC } from '../../Redux/packs-reducer';

export const Search: React.FC<any> = () => {
    const dispatch = useDispatch();
    const packs = useSelector<AppStateType, Array<cardsType>>(state => state.packs.cardPacks)
    const searchResult = useSelector<AppStateType, string>(state => state.packs.packName)

    const setSearchResult = (e: string) => {
        dispatch(setSearchValuePackAC(e))
    }

    return (
        <div className={s.container}>
            Search:
            <SuperInputText value={searchResult} onChangeText={setSearchResult} />
            <Range />
            <SuperButton onClick={() => dispatch(dispatch(packsTC(10, 1, 10, 10, searchResult)))}>Search</SuperButton>
        </div>
    )
};







