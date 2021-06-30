import React from 'react'
import {Dispatch} from "redux";
import {authApi} from "../api/fridayProject-api";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
const newPasswordReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "NEW_PASS/SET-ERROR":
            return {...state, error: action.error}
        case "NEW_PASS/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case "NEW_PASS/SET-STATUS":
            return {...state, status: action.status}
    }
    return {...state};
}


export const setAppErrorAC = (error: string | null) => ({type: 'NEW_PASS/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'NEW_PASS/SET-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'NEW_PASS/SET-IS-INITIALIZED',
    isInitialized
} as const)


export const newPassTC = (password: string, token: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.newPassword(password, token)
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


export default newPasswordReducer;