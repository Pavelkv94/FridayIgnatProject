import React, { useEffect } from 'react';
import s from './Search.module.css'
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import RangeSlider from './Range/RangeSlider'

type PropsType = {
    packName: string
    min: number
    max: number
    target: "packs" | "cards"
    inputCallback: (value: string) => void
    btnCallback: () => void

}
export const Search: React.FC<PropsType> = (props) => {

    return (
        <div className={s.container}>
            Search:
            <SuperInputText value={props.packName} onChangeText={props.inputCallback} />
            <RangeSlider min={props.min} max={props.max} target={props.target} />
            <SuperButton onClick={props.btnCallback}>Search</SuperButton>
        </div>
    )
};







