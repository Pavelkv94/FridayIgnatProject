import React from 'react'
import { Dispatch } from 'redux'
import { packsApi, responsePacksType } from "../api/packs-api";
import { authTC } from './login-reducer';
import { AppStateType } from './store';

export type SortValueType = "name" | "cardCount" | "updated" | "url" | ""

const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    min: 0,
    max: 10,
    page: 1,
    pageCount: 5,
    error: undefined,
    isInitialized: false,
    sortPacks: "1update",
    status: 'idle',
    packName: ""
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
            return { ...state, packName: action.value }
        case "PACKS/SET-STATUS":
            return { ...state, status: action.status }
        case 'PACKS/SORT':
            return { ...state, sortPacks: action.sortPacks }
        case 'PACKS/SET-RANGE':
            return { ...state, min: action.min, max: action.max }
        default: return state
    }

}


export const setRangeAC = (min: number, max: number) => ({ type: 'PACKS/SET-RANGE', min, max } as const)
export const sortPAckAC = (sortPacks: string) => ({ type: 'PACKS/SORT', sortPacks } as const)

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'PACKS/SET-STATUS', status } as const)
export const getCardsAC = (cards: initialStateType) => ({ type: 'PACKS/GET_CARDS', cards } as const)
export const setAppErrorPacksAC = (error: string | undefined) => ({ type: 'PACKS/SET-ERROR', error } as const)
export const setIsInitializedPackAC = (isInitialized: boolean) => ({
    type: 'PACKS/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const setSearchValuePackAC = (value: string) => ({ type: 'PACKS/SET-SEARCH-VALUE', value })

export const packsTC = (min?: number, max?: number, page?: number, pageCount?: number, packName?: string, sortPacks?: string) => (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    let state = getState();

    dispatch(setAppStatusAC("loading"))
    packsApi.getPacks(min, max, page, pageCount, packName, sortPacks)
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

export type setRangeACType = ReturnType<typeof setRangeAC>;
export type sortPAckACType = ReturnType<typeof sortPAckAC>;
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
    | sortPAckACType
    | setRangeACType
export default packsReducer;