import React from 'react';
import s from './SortButton.module.css'

type PropsSortType = {
    sortValue: string
    sortPacks: string
    sortCallback: (n: 1 | 0, sortValue: string) => void
}

export const SortButton: React.FC<PropsSortType> = (props) => {

    return (
        <div className={s.container}>
            <button onClick={() => props.sortCallback(1,  props.sortValue)}>&#5123;</button>
            <button onClick={() => props.sortCallback(0,  props.sortValue)}>&#5121;</button>
        </div>
    )
};







