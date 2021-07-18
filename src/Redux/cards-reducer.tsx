import { Dispatch } from 'redux'
import { packsApi, responseCardType } from "../api/packs-api";
import { AppStatusActionType, setAppStatusAC } from './app-reducer';

import { AppStateType } from './store';


const initialState: initialStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "" as string,

    grade: 2 as number,
    error: undefined,
    isInitialized: true,
    sortCards: "1update",
    cardQuestion: ""
}
type initialStateType = responseCardType


const cardsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CARDS/GET_CARDS":
            return {
                ...state,
                cards: action.cards.cards,
                cardsTotalCount: action.cards.cardsTotalCount,
                maxGrade: action.cards.maxGrade,
                minGrade: action.cards.minGrade,
                page: action.cards.page,
                pageCount: action.cards.pageCount,
                packUserId: action.cards.packUserId
            }
        case "CARDS/SET-ERROR":
            return { ...state, error: action.error }
        case "CARDS/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        case 'CARDS/SET-SEARCH-VALUE':
            return { ...state, cardQuestion: action.value }
        case 'CARDS/SORT':
            return { ...state, sortCards: `${action.n}${action.sortValue}` }
        case 'CARDS/SET-RANGE':
            return { ...state, minGrade: action.min, maxGrade: action.max }
        case 'CARDS/SET-PAGE':
            return { ...state, page: action.page }
        case 'CARDS/SET-PAGECOUNT':
            return { ...state, pageCount: action.value }
        case 'CARDS/SET-ID':
            return { ...state, packUserId: action.userId }
        case 'CARDS/SET-GRADE':
            return { ...state, grade: action.grade }
        default: return state
    }

}
export const setGradeAC = (grade: number) => ({ type: 'CARDS/SET-GRADE', grade } as const)
export const setPackUserIdAC = (userId: string) => ({ type: 'CARDS/SET-ID', userId } as const)
export const setPageCountOfCardsAC = (value: number) => ({ type: 'CARDS/SET-PAGECOUNT', value } as const)
export const setPageOfCardsAC = (page: number) => ({ type: 'CARDS/SET-PAGE', page } as const)
export const setRangeCardsAC = (min: number, max: number) => ({ type: 'CARDS/SET-RANGE', min, max } as const)
export const sortCardAC = (n: 1 | 0, sortValue: string) => ({ type: 'CARDS/SORT', n, sortValue } as const)
export const setSearchValueCardAC = (value: string) => ({ type: 'CARDS/SET-SEARCH-VALUE', value } as const)
export const getCardAC = (cards: initialStateType) => ({ type: 'CARDS/GET_CARDS', cards } as const)
export const setAppErrorPacksAC = (error: string | undefined) => ({ type: 'CARDS/SET-ERROR', error } as const)
export const setIsInitializedPackAC = (isInitialized: boolean) => ({
    type: 'CARDS/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const cardsTC = (cardsPack_id: string) => (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    let state = getState().cards;
    dispatch(setAppStatusAC("loading"))
    packsApi.getCards(cardsPack_id, state.cardQuestion, state.minGrade, state.maxGrade, state.sortCards, state.page, state.pageCount,)

        .then((response) => {
            dispatch(getCardAC(response.data))
            dispatch(setIsInitializedPackAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const cardsAdd = (cardsPack_id: string, question?: string, answer?: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC("loading"))
    packsApi.setCards(cardsPack_id, question, answer)
        .then(() => {
            dispatch(cardsTC(cardsPack_id))
            dispatch(setAppStatusAC("loading"))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
            dispatch(setAppStatusAC("loading"))
        })
    dispatch(setAppStatusAC("loading"))
}

export const cardsDeleteTC = (id: string, cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC("loading"))
    packsApi.deleteCards(id)
        .then(() => {
            dispatch(cardsTC(cardsPack_id))
            dispatch(setAppStatusAC("loading"))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
            dispatch(setAppStatusAC("loading"))
        })
    dispatch(setAppStatusAC("loading"))
}

export const cardsUpdateTC = (id: string, cardsPack_id: string, question?: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC("loading"))
    packsApi.updateCards(id, question)
        .then(() => {
            dispatch(cardsTC(cardsPack_id))
            dispatch(setAppStatusAC("loading"))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
            dispatch(setAppStatusAC("loading"))
        })
    dispatch(setAppStatusAC("loading"))
}

export const setGradeTC = (id: string, grade: number) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC("loading"))
    packsApi.setGradeCards(id, grade)
        .then((res) => {
            dispatch(setGradeAC(res.data.updatedGrade.grade))
            dispatch(setAppStatusAC("loading"))
        })
        .catch((error) => {
            dispatch(setAppErrorPacksAC(error.response.data.error))
            dispatch(setAppStatusAC("loading"))
        })
    dispatch(setAppStatusAC("loading"))
}


export type setGradeACType = ReturnType<typeof setGradeAC>
export type setPackUserIdACType = ReturnType<typeof setPackUserIdAC>
export type setPageCountOfCardsACType = ReturnType<typeof setPageCountOfCardsAC>
export type setPageOfCardsACType = ReturnType<typeof setPageOfCardsAC>
export type setRangeCardsACType = ReturnType<typeof setRangeCardsAC>;
export type sortCardACType = ReturnType<typeof sortCardAC>;
export type setSearchValueCardTypeAC = ReturnType<typeof setSearchValueCardAC>;
export type getCardsTypeAC = ReturnType<typeof getCardAC>;
export type setAppErrorPacksTypeAC = ReturnType<typeof setAppErrorPacksAC>;
export type setIsInitializedPackTypeAC = ReturnType<typeof setIsInitializedPackAC>;

type ActionType = getCardsTypeAC
    | setAppErrorPacksTypeAC
    | setIsInitializedPackTypeAC
    | setSearchValueCardTypeAC
    | sortCardACType
    | setRangeCardsACType
    | setPageOfCardsACType
    | setPageCountOfCardsACType
    | setPackUserIdACType
    | setGradeACType
    | AppStatusActionType
export default cardsReducer;