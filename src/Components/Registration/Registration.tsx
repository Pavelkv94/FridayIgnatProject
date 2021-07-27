import React, { useEffect, useState } from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { useDispatch, useSelector } from "react-redux";
import { registerTC, setAppErrorAC, setIsInitializedAC } from "../../Redux/reg-reducer";
import { NavLink, Redirect } from 'react-router-dom';
import { AppStateType } from "../../Redux/store";
import style from "./Registration.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import s from './Registration.module.css'
import { PATH } from '../../Routes';

export const Registration =React.memo( () => {
    //useState
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    //useSelectors
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.reg.isInitialized)
    const status = useSelector<AppStateType, string>((state) => state.app.status)
    const error = useSelector<AppStateType, string | null>((state) => state.reg.error)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

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
        return <Redirect to='/login' />
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={s.container}>
            <div className={s.regContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Sign In</p>
                {status !== 'idle' ? <Preloader /> : null}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div className={s.inputs}>
                    <SuperInputText value={email} onChangeText={setEmail} isType="email" error={error ? true : false} errorMessage={error} />
                    <SuperInputText value={password} onChangeText={setPassword} isType="password" error={error ? true : false} errorMessage={error} />
                    <SuperInputText value={passwordConf} onChangeText={setPasswordConf} isType="confirm password" error={error ? true : false} errorMessage={error} />
                </div>
                <div className={s.control}>
                    <NavLink to={PATH.LOGIN}> <SuperButton className={s.cancelBtn} disabled={status !== 'idle'} onClick={() => { }}>Cancel</SuperButton></NavLink>

                    <SuperButton style={{ width: "187px" }} disabled={status !== 'idle'} onClick={buttonCallback}>Sign Up</SuperButton>
                </div>

            </div>
        </div>
    );
})
