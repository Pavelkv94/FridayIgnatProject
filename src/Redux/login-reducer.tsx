import React from 'react'
import { Dispatch } from 'redux';
import { authApi, ResponseLoginType } from '../api/fridayProject-api';

let initialState = {
    userData: {} as ResponseLoginType,
    email: null as string | null,
    error: null as string | null,
    isLoggedIn: false as boolean
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
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state;
    }

}

type SetUserDataACType = ReturnType<typeof setUserDataAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type IsLoggedInACType = ReturnType<typeof isLoggedInAC>

export const setUserDataAC = (profileData: PayloadType) => ({
    type: 'LOGIN/SET-USER-DATA',
    profileData,
} as const)

export const setErrorAC = (error: string | null) => ({
    type: 'LOGIN/SET-ERROR',
    error
} as const)

export const isLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'LOGIN/IS-LOGGED-IN',
    isLoggedIn
} as const)

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authApi.login(email, password, rememberMe)
        .then(
            res => {

                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(true))
            }
        )
        .catch(err => {
            dispatch(setErrorAC(err))

        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authApi.logout()
        .then(res => {
            isLoggedInAC(false)
        }).catch(err => {
            alert("error logout")
        })

}

export default loginReducer;