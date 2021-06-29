import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInAC, loginTC } from '../../Redux/login-reducer';
import { AppStateType } from '../../Redux/store';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import { Redirect } from 'react-router-dom';
import s from './Loginization.module.css'
import SuperCheckbox from '../../SuperComponents/c3-SuperCheckbox/SuperCheckbox';



export function Loginization() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

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

        <div>
            <h1>Loginization</h1>
            <span style={{ color: 'green', margin: "10px" }}>nya-admin@nya.nya <br />
                1qazxcvBG</span> <hr />

            <div>Email:</div>
            <SuperInputText value={email} onChangeText={setEmail} />
            <div>Password:</div>
            <SuperInputText value={password} onChangeText={setPassword} />
            <br />
            
            <span><SuperCheckbox checked={rememberMe} onChange={checkboxChange} /> Remember Me</span>
            <div>
                <SuperButton onClick={onCLickHandler}>Sign Up</SuperButton>
            </div>
        </div>
    );
}
