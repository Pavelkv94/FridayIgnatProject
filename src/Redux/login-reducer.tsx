import React from 'react'
import { Dispatch } from 'redux';
import { authApi, ResponseLoginType } from '../api/fridayProject-api';

let initialState = {
    userData: {} as ResponseLoginType,
    isAuth: false as boolean
}
type PayloadType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
    info?: string
}

export type InitialAuthType = typeof initialState;
export type LoginActionType = SetUserDataACType | SetErrorACType | IsLoggedInACType

const loginReducer = (state: InitialAuthType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'LOGIN/SET-USER-DATA':
            return {
                ...state,
                userData: action.profileData,
            }
        case 'LOGIN/SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'LOGIN/IS-LOGGED-IN':
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
    }

}

type SetUserDataACType = ReturnType<typeof getUserDataAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type IsLoggedInACType = ReturnType<typeof isLoggedInAC>

export const getUserDataAC = (profileData: PayloadType) => ({
    type: 'LOGIN/SET-USER-DATA',
    profileData,
} as const)

export const setErrorAC = (error: string | null) => ({
    type: 'LOGIN/SET-ERROR',
    error
} as const)

export const isLoggedInAC = (isAuth: boolean) => ({
    type: 'LOGIN/IS-LOGGED-IN',
    isAuth
} as const)

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authApi.login(email, password, rememberMe)
        .then(
            res => {

                dispatch(getUserDataAC(res.data))
                dispatch(isLoggedInAC(true))
            }
        )
        .catch(err => {
            dispatch(setErrorAC(err))
            alert("Введены неверные данные")
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authApi.logout()
        .then(res => {
            dispatch(isLoggedInAC(false))
        }).catch(err => {
            alert(err)
            //dispatch(isLoggedInAC(false))
        })

}

export default loginReducer;