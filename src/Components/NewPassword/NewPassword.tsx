import React, { useState } from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import { useDispatch, useSelector } from "react-redux";
import { newPassTC } from "../../Redux/new-password-reducer";
import { Redirect, useParams } from 'react-router-dom';
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { AppStateType } from "../../Redux/store";
import { setAppErrorAC } from "../../Redux/new-password-reducer";
import style from "../Registration/Registration.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import s from './NewPassword.module.css'

export function NewPassword() {
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const dispatch = useDispatch()
    const { token } = useParams<{ token: string }>()

    const status = useSelector<AppStateType, string>((state) => state.app.status)
    const error = useSelector<AppStateType, string | null>((state) => state.newPassPage.error)
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.newPassPage.isInitialized)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

    // if (isAuth) {
    //     return <Redirect to='/profile'/>
    // }
    if (isInitialized) {
        return <Redirect to='/login' />
    }
    const buttonCallback = () => {
        if (password === passwordConf) {
            dispatch(newPassTC(password, token))
        } else {
            dispatch(setAppErrorAC("Password mismatch"))
        }
    }

    return (
        <div className={s.container}>
            <div className={s.newPassContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Create new password</p>
                {status !== 'idle' ? <Preloader /> : null}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div className={s.inputs}>
                    <SuperInputText value={password} onChangeText={setPassword} isType="password" error={error ? true : false} errorMessage={error}/>
                    <SuperInputText value={passwordConf} onChangeText={setPasswordConf} isType="repeate password" error={error ? true : false} errorMessage={error}/>
                </div>
                <div className={s.info}>
                    <p>Create new password and we will send you further instructions to email</p>
                </div>
                <div>
                    <SuperButton style={{ width: "266px"}} disabled={status !== "idle"} onClick={buttonCallback}>Create new password</SuperButton>
                </div>
            </div>
        </div>
    );
}
