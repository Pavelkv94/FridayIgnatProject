import React from 'react';
import { useState } from 'react';
import s from './SortButton.module.css'

type PropsSortType = {
    sortValue: string
    sortPacks: string
    sortCallback: (n: 1 | 0, sortValue: string) => void
}

export const SortButton: React.FC<PropsSortType> = (props) => {
    let [pointer, setPointer] = useState(false)
    return (
        <div className={s.container} onClick={() => setPointer(!pointer)}>
            {pointer
                ? <div onClick={() => props.sortCallback(1, props.sortValue)}>&#5123;</div>
                : <div onClick={() => props.sortCallback(0, props.sortValue)}>&#5121;</div>}


        </div>
    )
};







