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
const newPasswordReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "NEW_PASS/SET-ERROR":
            return { ...state, error: action.error }
        case "NEW_PASS/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        default: return { ...state };
    }
}



export const setAppErrorAC = (error: string | null) => ({ type: 'NEW_PASS/SET-ERROR', error } as const)
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

export type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;

type ActionsType = setErrorActionType | setIsInitializedActionType | AppStatusActionType


export default newPasswordReducer;