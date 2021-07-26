import React from 'react'
import { Dispatch } from 'redux';
import { authApi, ResponseLoginType } from '../api/fridayProject-api';
import { AppStatusActionType, setAppStatusAC } from './app-reducer';

let initialState = {
    userData: {} as ResponseLoginType,
    isAuth: "" as string,
    status: "idle",
    error: "" as string | null,
}


export type InitialAuthType = typeof initialState;
export type LoginActionType = SetUserDataACType | SetErrorACType | IsLoggedInACType | AppStatusActionType

const loginReducer = (state: InitialAuthType = initialState, action: LoginActionType): InitialAuthType => {
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
                isAuth: action._id
            }
        default:
            return state;
    }

}

//Action creators
type SetUserDataACType = ReturnType<typeof getUserDataAC>
type SetErrorACType = ReturnType<typeof setErrorAC>
type IsLoggedInACType = ReturnType<typeof isLoggedInAC>

export const getUserDataAC = (profileData: ResponseLoginType) => ({
    type: 'LOGIN/SET-USER-DATA',
    profileData,
} as const)

export const setErrorAC = (error: string | null) => ({
    type: 'LOGIN/SET-ERROR',
    error
} as const)

export const isLoggedInAC = (_id: string) => ({
    type: 'LOGIN/IS-LOGGED-IN',
    _id
} as const)

//Thunk creators
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.login(email, password, rememberMe)
        .then(
            res => {
                dispatch(getUserDataAC(res.data))
                dispatch(isLoggedInAC(res.data._id))
                dispatch(setAppStatusAC("succeeded"))
            }
        )
        .catch(err => {

            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}


export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logout()
        .then(res => {
            dispatch(isLoggedInAC(""))
            dispatch(setAppStatusAC("succeeded"))
        }).catch(err => {
            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const authTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.me()
        .then(res => {
            dispatch(getUserDataAC(res.data))
            dispatch(isLoggedInAC(res.data._id))
            dispatch(setAppStatusAC("succeeded"))

        }).catch(err => {
            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
            dispatch(setAppStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const updateUserTC = (name: string, avatar?: string) => (dispatch: Dispatch<any>) => {
    {
        dispatch(setAppStatusAC("loading"))
//@ts-ignore
        authApi.updateUser(name, avatar)
            .then(res => {
                dispatch(getUserDataAC(res.data.updatedUser));
                dispatch(isLoggedInAC(res.data.updatedUser._id))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(err => {
                const error = err.response
                dispatch(setErrorAC(error
                    ? err.response.data.error
                    : (err.message + ', more details in the console')))
                dispatch(setAppStatusAC("failed"))
            })
            .finally(() => {
                dispatch(setAppStatusAC("idle"))
            })

    }
};
export default loginReducer;


