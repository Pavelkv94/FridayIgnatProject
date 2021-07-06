import React from 'react'
import {Dispatch} from 'redux'
import {ArrCardType, packsApi, responseCardType} from "../api/packs-api";
import {authTC, isLoggedInAC} from './login-reducer';


const initialState: initialStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 5,
    page: 1,
    pageCount:4,
    packUserId: "" as string,
    error: undefined,
    isInitialized: true
}
type initialStateType = responseCardType




export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const cardsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CARDS/GET_CARDS":
            return action.cards
        case "CARDS/SET-ERROR":
            return {...state, error: action.error}
        case "CARDS/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
    }
    return state
}

export const getCardAC = (cards: initialStateType) => ({type: 'CARDS/GET_CARDS', cards} as const)
export const setAppErrorPacksAC = (error: string | undefined) => ({type: 'CARDS/SET-ERROR', error} as const)
export const setIsInitializedPackAC = (isInitialized: boolean) => ({
    type: 'CARDS/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const cardsTC = (cardsPack_id: string) => (dispatch: Dispatch<any>) => {

    packsApi.getCards(cardsPack_id)

        .then((response) => {
            dispatch(authTC())
            dispatch(getCardAC(response.data))
            dispatch(setIsInitializedPackAC(true))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

export const cardsAdd = (cardsPack_id: string) => (dispatch: Dispatch<any>) => {

    packsApi.setCards("privettttt")
        .then(() => {
            dispatch(cardsTC(cardsPack_id))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

export const cardsDeleteTC = (id: string, cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    packsApi.deleteCards(id)
        .then(() => {
            dispatch(cardsTC(cardsPack_id))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

// export const cardsUpdateTC = (_id: string, question?: string,cardsPack_id?: string) => (dispatch: Dispatch<any>) => {
//
//     packsApi.updateCards(_id, question)
//         .then(() => {
//             dispatch(cardsTC(cardsPack_id))
//         })
//         .catch((error) => {
//             dispatch(setAppErrorPacksAC(error.response.data.error))
//         })
//         .finally(() => {
//
//         })
// }

export type getCardsTypeAC = ReturnType<typeof getCardAC>;
export type setAppErrorPacksTypeAC = ReturnType<typeof setAppErrorPacksAC>;
export type setIsInitializedPackTypeAC = ReturnType<typeof setIsInitializedPackAC>;

type ActionType = getCardsTypeAC
    | setAppErrorPacksTypeAC
    | setIsInitializedPackTypeAC

export default cardsReducer;