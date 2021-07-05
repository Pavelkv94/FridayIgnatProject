import React from 'react'
import {Dispatch} from 'redux'
import {authApi} from "../api/fridayProject-api";
import {cardsAPI} from "../api/cards-api";


const initialState: Array<cardsType> = [
    {
        name: "123",
        cardsCount: 2,
        updated: "21/01/1997",
        url: "hello.world"
    },
    {
        name: "123",
        cardsCount: 56,
        updated: "21/01/1997",
        url: "hello.wwerorld"
    },
    {
        name: "123",
        cardsCount: 11,
        updated: "21/01/1997",
        url: "hello.11world"
    },
    {
        name: "456",
        cardsCount: 32,
        updated: "21/01/1997",
        url: "hel22lo.world"
    }
]


export type cardsType = {
    name: string
    cardsCount: number
    updated: string
    url: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const packsReducer = (state = initialState, action: any): Array<cardsType> => {

    return state;
}


export const packsTC = () => (dispatch: Dispatch) => {

    cardsAPI.getCards()
        .then(() => {

        })
        .catch((error) => {

        })
        .finally(() => {

        })
}


export default packsReducer;