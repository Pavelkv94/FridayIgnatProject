import React, { useState } from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { useDispatch, useSelector } from "react-redux";
import { sendTokenTC } from "../../Redux/password-recovery-reducer";
import style from "../Registration/Registration.module.css";
import { AppStateType } from "../../Redux/store";
import { NavLink, Redirect } from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";
import s from './PasswordRecovery.module.css'
import { PATH } from '../../Routes';
import { CheckEmail } from './CheckEmail/CheckEmail';

export const PasswordRecovery = React.memo(() => {
    //useState
    const [email, setEmail] = useState<string>("")

    //useSelectors
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.recovPass.isInitialized)
    const status = useSelector<AppStateType, string>((state) => state.app.status)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const error = useSelector<AppStateType, string | null>((state) => state.recovPass.error)

    const dispatch = useDispatch()

    const buttonCallback = () => {
        dispatch(sendTokenTC(email))
    }

    if (isInitialized) {
        return <CheckEmail />
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={s.container} >
            <div className={s.recoveryContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Forgot your password?</p>
                {status !== 'idle' ? <Preloader /> : null}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <SuperInputText value={email} onChangeText={setEmail} isType="email" error={error ? true : false} errorMessage={error} />
                <div className={s.info}>
                    <p>Enter your email address and we will send you further instructions </p>
                </div>
                <div>
                    <SuperButton style={{ width: "266px", marginTop: "100px" }} disabled={status !== "idle"} onClick={buttonCallback}>SEND</SuperButton>
                </div>
                <div className={s.info}>
                    <p>Did you remember your password?</p>
                </div>
                <div className={s.goLogin}><NavLink to={PATH.LOGIN}>Try logging in</NavLink></div>
            </div>
        </div >
    );
})