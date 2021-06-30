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

const from = "test-front-admin<ai73a@yandex.by>"
const message = `<div style="background-color: lime; padding: 15px"> 
password recovery link(bla bla): 
<a href='http://localhost:3000/FridayIgnatProject#/newPassword/$token$'>
link</a></div>`

const PasswordRecoveryReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "FORGOT/SET-ERROR":
            return {...state, error: action.error}
        case "FORGOT/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case "FORGOT/SET-STATUS":
            return {...state, status: action.status}
    }
    return {...state};
}
export const setAppErrorAC = (error: string | null) => ({type: 'FORGOT/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'FORGOT/SET-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'FORGOT/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const sendTokenTC = (email: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.forgot(email, from, message)
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


export default PasswordRecoveryReducer;