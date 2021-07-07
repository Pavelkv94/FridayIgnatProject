import React, { useEffect } from 'react';
import Range from './Range/Range'
import s from './Search.module.css'
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { AppStateType } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { packsTC, setSearchValuePackAC } from '../../Redux/packs-reducer';
type PropsType = {
    packName: string
    inputCallback: (value: string) => void
    btnCallback: () => void
}
export const Search: React.FC<PropsType> = (props) => {

    //const { min, max, page, pageCount, packName, sortPacks } = useSelector<AppStateType, any>(state => state.packs)

    // const setSearchResult = (value: string) => {
    //     dispatch(setSearchValuePackAC(value))
    // }

    return (
        <div className={s.container}>
            Search:
            <SuperInputText value={props.packName} onChangeText={props.inputCallback} />
            <Range />
            <SuperButton onClick={props.btnCallback}>Search</SuperButton>
        </div>
    )
};







