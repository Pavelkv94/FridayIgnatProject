import React from 'react'
import { Dispatch } from 'redux'
import { authApi } from "../api/fridayProject-api";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REG/SET-ERROR":
            return { ...state, error: action.error }
        case "REG/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        case "REG/SET-STATUS":
            return { ...state, status: action.status }
        default: return { ...state };
    }
}
export const setAppErrorAC = (error: string | null) => ({ type: 'REG/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'REG/SET-STATUS', status } as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: 'REG/SET-IS-INITIALIZED', isInitialized } as const)


export const registerTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authApi.register(email, password)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsInitializedAC(true))
        })
        .catch((error) => {
            dispatch(setAppStatusAC("failed"))
            dispatch(setAppErrorAC(error.response.data.error))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export type setErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;

type ActionsType = setErrorActionType | setStatusActionType | setIsInitializedActionType


export default registrationReducer;