import React, { useEffect } from 'react';
import Range from './Range/Range'
import s from './Search.module.css'
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { AppStateType } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {  packsTC, setSearchValuePackAC } from '../../Redux/packs-reducer';

export const Search: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { min, max, page, pageCount, packName, sortPacks } = useSelector<AppStateType, any>(state => state.packs)

    const setSearchResult = (value: string) => {
        dispatch(setSearchValuePackAC(value))
    }

    return (
        <div className={s.container}>
            Search:
            <SuperInputText value={packName} onChangeText={setSearchResult} />
            <Range />
            <SuperButton onClick={() => dispatch(packsTC(min, max, page, pageCount, packName, sortPacks))}>Search</SuperButton>
        </div>
    )
};







