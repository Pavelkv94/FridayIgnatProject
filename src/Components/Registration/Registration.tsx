import React, {useEffect, useState} from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setAppErrorAC, setIsInitializedAC} from "../../Redux/reg-reducer";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../Redux/store";
import style from "./Registration.module.css"

export function Registration() {
//useState
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
//useSelectors
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.reg.isInitialized)
    const status = useSelector<AppStateType, string>((state) => state.reg.status)
    const error = useSelector<AppStateType, string | null>((state) => state.reg.error)

    const dispatch = useDispatch()

    const buttonCallback = () => {
        if (password === passwordConf) {
            dispatch(registerTC(email, password))
        } else {
            dispatch(setAppErrorAC("Password mismatch"))
        }
    }

    useEffect(() => {
        dispatch(setIsInitializedAC(false))
        dispatch(setAppErrorAC(null))
    }, [isInitialized])

    if (isInitialized) {
        return <Redirect to='/login'/>
    }
    return (

        <div>

            <h1>Registration</h1>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>Email:</div>
            <SuperInputText value={email} onChangeText={setEmail}/>
            <div>password:</div>
            <SuperInputText value={password} onChangeText={setPassword}/>
            <div>confirm password:</div>
            <SuperInputText value={passwordConf} onChangeText={setPasswordConf}/>
            <div>
                <SuperButton disabled={status !== 'idle'} onClick={buttonCallback}>Sign Up</SuperButton>
            </div>

        </div>
    );
}
