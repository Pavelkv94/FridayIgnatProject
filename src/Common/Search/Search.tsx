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
        <div className={s.container} style={props.target === "cards" ? { width: "960px" } : { width: "730px" }}>
            {props.target === "packs" && <div> <RangeSlider min={props.min} max={props.max} target={props.target} /></div>}
            <div className={s.searchBar}>
                <SuperInputText value={props.packName} onChangeText={props.inputCallback} isType="Search..." target={props.target} />
                <div className={s.fake}></div>
                <SuperButton style={{ width: "174px" }} onClick={props.btnCallback}>Search</SuperButton>
            </div>

        </div>
    )
};







