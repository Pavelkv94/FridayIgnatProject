import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from '../../Redux/login-reducer';
import { AppStateType } from '../../Redux/store';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { NavLink, Redirect } from 'react-router-dom';
import s from './Loginization.module.css'
import SuperCheckbox from '../../SuperComponents/c3-SuperCheckbox/SuperCheckbox';
import Preloader from "../../Common/Preloader/Preloader";
import { PATH } from '../../Routes';

export function Loginization() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const status = useSelector<AppStateType, string>((state) => state.app.status)
    const error = useSelector<AppStateType, string | null>((state) => state.loginPage.error)

    const onCLickHandler = () => {
        dispatch(loginTC(email, password, rememberMe))
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    }
    const checkboxChange = () => {
        setRememberMe(!rememberMe)
    }
    return (
        <div className={s.container}>
            <div className={s.loginContainer}>
            
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Sign In</p>
                {status !== 'idle' ? <Preloader /> : null}
                <div className={s.info}>
                    <p>Use common test account credentials:</p>
                    <p>Email: <span className={s.bold}>pavlik.gerasim@yandex.by</span> </p>
                    <p>Password: <span className={s.bold}> 123456789</span></p>
                </div>
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div className={s.inputs}>
                    <SuperInputText value={email} onChangeText={setEmail} placeholder="email" isType="email" error={!!error} errorMessage={error} />
                    <SuperInputText value={password} onChangeText={setPassword} placeholder="password" isType="password" error={!!error} errorMessage={error} />
                </div>

                <span className={s.remember}><SuperCheckbox checked={rememberMe} onChange={checkboxChange} /> Remember Me</span>
                <div className={s.forgot}> <NavLink to={PATH.RECOVERY_PASS}> Forgot Password?</NavLink></div>
                <div><SuperButton onClick={onCLickHandler} style={{width:"266px"}}>Login</SuperButton></div>
                <div className={s.regBlock}>
                    <p className={s.info}>Don’t have an account?</p>
                    <div> <NavLink to={PATH.REGISTRATION}> Sign Up</NavLink></div>
                </div>
            </div>
        </div>
    );
}
