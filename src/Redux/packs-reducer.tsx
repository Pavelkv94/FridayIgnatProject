import React from 'react'
import { Dispatch } from 'redux'
import { packsApi, responsePacksType } from "../api/packs-api";
import { AppStateType } from './store';


const initialState: initialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    minCardsCount: 0,
    maxCardsCount: 4,
    min: 0,
    max: 20,
    page: 1,
    pageCount: 4,
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
        case "PACKS/GET-PACKS":
            return {
                ...state,
                cardPacks: action.packs.cardPacks,
                cardPacksTotalCount: action.packs.cardPacksTotalCount,
                minCardsCount: action.packs.minCardsCount,
                maxCardsCount: action.packs.maxCardsCount,
                page: action.packs.page,
                pageCount: action.packs.pageCount,
            }
        case "PACKS/SET-ERROR":
            return { ...state, error: action.error }
        case "PACKS/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        case 'PACKS/SET-SEARCH-VALUE':
            return { ...state, packName: action.value }
        case "PACKS/SET-STATUS":
            return { ...state, status: action.status }
        case 'PACKS/SORT':
            return { ...state, sortPacks: `${action.n}${action.sortValue}` }
        case 'PACKS/SET-RANGE':
            return { ...state, min: action.min, max: action.max }
        case 'PACKS/SET-PAGE':
            return { ...state, page: action.page }
        case 'PACKS/SET-PAGECOUNT':
            return { ...state, pageCount: action.value }
        default: return state
    }

}

export const setPageCountOfPacksAC = (value: number) => ({ type: 'PACKS/SET-PAGECOUNT', value } as const)
export const setPageOfPacksAC = (page: number) => ({ type: 'PACKS/SET-PAGE', page } as const)
export const setRangePacksAC = (min: number, max: number) => ({ type: 'PACKS/SET-RANGE', min, max } as const)
export const sortPackAC = (n: 1 | 0, sortValue: string) => ({ type: 'PACKS/SORT', n, sortValue } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'PACKS/SET-STATUS', status } as const)
export const getPacksAC = (packs: initialStateType) => ({ type: 'PACKS/GET-PACKS', packs } as const)
export const setAppErrorPacksAC = (error: string | undefined) => ({ type: 'PACKS/SET-ERROR', error } as const)
export const setIsInitializedPackAC = (isInitialized: boolean) => ({
    type: 'PACKS/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const setSearchValuePackAC = (value: string) => ({ type: 'PACKS/SET-SEARCH-VALUE', value })

export const packsTC = () => (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    let state = getState().packs;
    dispatch(setAppStatusAC("loading"))
    packsApi.getPacks(state.min, state.max, state.page, state.pageCount, state.packName, state.sortPacks)
        .then((response) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(getPacksAC(response.data))
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

export type setPageCountOfPacksACType = ReturnType<typeof setPageCountOfPacksAC>
export type setPageOfPacksACType = ReturnType<typeof setPageOfPacksAC>
export type setRangePacksACType = ReturnType<typeof setRangePacksAC>;
export type sortPackACType = ReturnType<typeof sortPackAC>;
export type setAppStatusTypeAC = ReturnType<typeof setAppStatusAC>;
export type getPacksTypeAC = ReturnType<typeof getPacksAC>;
export type setAppErrorPacksTypeAC = ReturnType<typeof setAppErrorPacksAC>;
export type setIsInitializedPackTypeAC = ReturnType<typeof setIsInitializedPackAC>;
export type setSearchValuePackTypeAC = { type: 'PACKS/SET-SEARCH-VALUE', value: string }
type ActionType = getPacksTypeAC
    | setAppErrorPacksTypeAC
    | setIsInitializedPackTypeAC
    | setSearchValuePackTypeAC
    | setAppStatusTypeAC
    | sortPackACType
    | setRangePacksACType
    | setPageOfPacksACType
    | setPageCountOfPacksACType
export default packsReducer;