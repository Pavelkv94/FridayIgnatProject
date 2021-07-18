import React, {useState} from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {newPassTC} from "../../Redux/new-password-reducer";
import {Redirect, useParams} from 'react-router-dom';
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {AppStateType} from "../../Redux/store";
import {setAppErrorAC} from "../../Redux/new-password-reducer";
import style from "../Registration/Registration.module.css";
import Preloader from "../../Common/Preloader/Preloader";

export function NewPassword() {
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()

    const status = useSelector<AppStateType, string>((state) => state.app.status)
    const error = useSelector<AppStateType, string | null>((state) => state.newPassPage.error)
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.newPassPage.isInitialized)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

    // if (isAuth) {
    //     return <Redirect to='/profile'/>
    // }
    if (isInitialized) {
        return <Redirect to='/login'/>
    }
    const buttonCallback = () => {
        if (password === passwordConf) {
            dispatch(newPassTC(password, token))
        } else {
            dispatch(setAppErrorAC("Password mismatch"))
        }
    }

    return (

        <div>
            {status !== 'idle' ? <Preloader/> : null}
            <h1>NewPassword</h1>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>password:</div>
            <SuperInputText value={password} onChangeText={setPassword}/>
            <div>Repeat password:</div>
            <SuperInputText value={passwordConf} onChangeText={setPasswordConf}/>
            <div>
                <SuperButton disabled={status !== "idle"} onClick={buttonCallback}>Cover</SuperButton>
            </div>
        </div>
    );
}
