import React, {useCallback, useState} from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {registerTC} from "../../Redux/reg-reducer";

export function Registration() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")

    const dispatch = useDispatch()

const buttonCallback = ()=> {
    dispatch(registerTC(email, password))
}

    return (

        <div>
            <h1>Registration</h1>
            <div>Email:</div>
            <SuperInputText value={email} onChangeText={setEmail}/>
            <div>password:</div>
            <SuperInputText value={password} onChangeText={setPassword}/>
            <div>confirm password:</div>
            <SuperInputText value={passwordConf} onChangeText={setPasswordConf}/>
            <div>
                <SuperButton onClick={buttonCallback}>Register</SuperButton>
            </div>

        </div>
    );
}
