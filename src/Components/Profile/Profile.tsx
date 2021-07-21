import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResponseLoginType} from '../../api/fridayProject-api';
import {authTC, logoutTC} from '../../Redux/login-reducer';
import {AppStateType} from '../../Redux/store';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'

export function Profile() {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const isAuthError = useSelector<AppStateType, string | null>(state => state.loginPage.error)
    const data = useSelector<AppStateType, ResponseLoginType>(state => state.loginPage.userData)

    useEffect(() => {
        if (!isAuth)
            dispatch(authTC())
    }, [])

    const logout = () => {
        dispatch(logoutTC());
    }
    if (isAuthError) {
        return <Redirect to={"/login"}/>;
    }

    //при успешной логинизации отрисовываем данные пользователя
    return (

        <div className={s.rootProfile}>
            <div className={s.container}>
                <div className={s.leftBox}>
                    <div className={s.avatarName}>
                        {data.avatar? data.avatar :
                            <img alt={"ava"}
                                 src={"https://image.flaticon.com/icons/png/512/21/21104.png"}/>}
                        <div>{data.name}</div>
                    </div>
                </div>
                {/*<br/>*/}
                {/*<h3>Данные пользователя</h3>*/}
                {/*<p>email - {data.email}</p>*/}
                {/*<p>name - {data.name}</p>*/}
                {/*<p>created - {data.created}</p>*/}
                {/*<p>updated - {data.updated}</p>*/}
                {/*<p>count of cards - {data.publicCardPacksCount}</p>*/}
                {/*<br/>*/}
            </div>
        </div>
    );
}