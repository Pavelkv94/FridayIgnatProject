import { Dispatch } from "redux";
import { authApi } from "../api/fridayProject-api";
import { AppStatusActionType, setAppStatusAC } from './app-reducer';

const initialState: InitialStateType = {
    error: null,
    isInitialized: false
}
export type InitialStateType = {
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

const from = "test-front-admin<ai73a@yandex.by>"
const message = `<div style="background-color: lime; padding: 15px"> 
password recovery link(bla bla): 
<a href='http://sozdatel31.github.io/FridayIgnatProject#/newPassword/$token$'>
link</a></div>`

const PasswordRecoveryReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "FORGOT/SET-ERROR":
            return { ...state, error: action.error }
        case "FORGOT/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        default: return { ...state };
    }

}
export const setAppErrorAC = (error: string | null) => ({ type: 'FORGOT/SET-ERROR', error } as const)
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
export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;

type ActionsType = setErrorActionType | setIsInitializedActionType | AppStatusActionType


export default PasswordRecoveryReducer;