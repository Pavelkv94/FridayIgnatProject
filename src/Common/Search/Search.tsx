import React from 'react';
import Range from './Range/Range'
import s from './Search.module.css'
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";

export const Search: React.FC<any> = (props) => {

    return (
        <div className={s.container}>
            Search:
            <SuperInputText />
            <Range />
            <SuperButton>Search</SuperButton>
        </div>
    )
};







