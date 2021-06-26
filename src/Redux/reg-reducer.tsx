import React from 'react'
import {Dispatch} from 'redux'
import {authApi} from "../api/fridayProject-api";
import {Redirect} from "react-router-dom";
const initialState = {

}

type InitialStateType = typeof initialState


const registrationReducer = (state: InitialStateType, action: any) => {

    return {state};
}

export const registerAC = (email: string, password: string) =>
    ({type: 'REGISTER_USER', email, password} as const)

export const registerTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authApi.register(email, password)
        .then(res => {
            const action = registerAC(email, password)
            dispatch(action)
            return <Redirect to='/login'/>
        })
}

export type registerActionType = ReturnType<typeof registerAC>;

type ActionsType = registerActionType



export default registrationReducer;