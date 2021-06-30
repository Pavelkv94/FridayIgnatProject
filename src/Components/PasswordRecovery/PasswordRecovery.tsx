import React, {useState} from 'react';
import SuperInputText from "../../SuperComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {sendTokenTC} from "../../Redux/password-recovery-reducer";
import style from "../Registration/Registration.module.css";
import {AppStateType} from "../../Redux/store";
import {Redirect} from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";

export function PasswordRecovery() {
    //useState
    const [email, setEmail] = useState<string>("")

//useSelectors
    const isInitialized = useSelector<AppStateType, boolean>((state) => state.recovPass.isInitialized)
    const status = useSelector<AppStateType, string>((state) => state.recovPass.status)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const error = useSelector<AppStateType, string | null>((state) => state.recovPass.error)

    const dispatch = useDispatch()

    const buttonCallback = () => {
        dispatch(sendTokenTC(email))
    }

    if (isInitialized) {
        return <div>OOOkay, check email</div>
    }
    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            {status !== 'idle' ? <Preloader/> : null}
            <h1>PasswordRecovery</h1>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>Email:</div>
            <SuperInputText value={email} onChangeText={setEmail}/>
            <div>
                <SuperButton disabled={status !== "idle"} onClick={buttonCallback}>SEND</SuperButton>
            </div>
        </div>
    );
}