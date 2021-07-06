import React from 'react'
import { Dispatch } from 'redux'
import { packsApi, responsePacksType } from "../api/packs-api";
import { authTC } from './login-reducer';


const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 5,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    error: undefined,
    isInitialized: false,

    status: 'idle',
    searchResult: ""
}
type initialStateType = responsePacksType

export type cardsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    url: string
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const packsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "PACKS/GET_CARDS":
            return action.cards
        case "PACKS/SET-ERROR":
            return { ...state, error: action.error }
        case "PACKS/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        case 'PACKS/SET-SEARCH-VALUE':
            return { ...state, searchResult: action.value }
        case "PACKS/SET-STATUS":
            return { ...state, status: action.status }
        default: return state
    }

}
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'PACKS/SET-STATUS', status } as const)
export const getCardsAC = (cards: initialStateType) => ({ type: 'PACKS/GET_CARDS', cards } as const)
export const setAppErrorPacksAC = (error: string | undefined) => ({ type: 'PACKS/SET-ERROR', error } as const)
export const setIsInitializedPackAC = (isInitialized: boolean) => ({
    type: 'PACKS/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const setSearchValuePackAC = (value: string) => ({ type: 'PACKS/SET-SEARCH-VALUE', value })

export const packsTC = (minCardsCount?: number, maxCardsCount?: number, page?: number, pageCount?: number) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC("loading"))
    packsApi.getPacks(minCardsCount, maxCardsCount, page, pageCount)
        .then((response) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(authTC())
            dispatch(getCardsAC(response.data))
            dispatch(setIsInitializedPackAC(true))
        })
        .catch((error) => {
            dispatch(setAppStatusAC("failed"))
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const packsAddTC = () => (dispatch: Dispatch<any>) => {

    packsApi.setPacks("privet")
        .then(() => {
            dispatch(packsTC())
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

export const packsDeleteTC = (id: string) => (dispatch: Dispatch<any>) => {
    packsApi.deletePacks(id)
        .then(() => {
            dispatch(packsTC())
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

export const packsUpdateTC = (_id: string, name: string) => (dispatch: Dispatch<any>) => {

    packsApi.updatePacks(_id, name)
        .then(() => {
            dispatch(packsTC())
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
        })
        .finally(() => {

        })
}

export type setAppStatusTypeAC = ReturnType<typeof setAppStatusAC>;
export type getCardsTypeAC = ReturnType<typeof getCardsAC>;
export type setAppErrorPacksTypeAC = ReturnType<typeof setAppErrorPacksAC>;
export type setIsInitializedPackTypeAC = ReturnType<typeof setIsInitializedPackAC>;
export type setSearchValuePackTypeAC = { type: 'PACKS/SET-SEARCH-VALUE', value: string }
type ActionType = getCardsTypeAC
    | setAppErrorPacksTypeAC
    | setIsInitializedPackTypeAC
    | setSearchValuePackTypeAC
    | setAppStatusTypeAC
export default packsReducer;