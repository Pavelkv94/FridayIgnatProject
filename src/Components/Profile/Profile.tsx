import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseLoginType } from '../../api/fridayProject-api';
import { authTC, logoutTC } from '../../Redux/login-reducer';
import { AppStateType } from '../../Redux/store';
import { Redirect } from 'react-router-dom';

export function Profile() {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const data = useSelector<AppStateType, ResponseLoginType>(state => state.loginPage.userData)

    useEffect(() => {
        dispatch(authTC())
    }, [])

    const logout = () => {
        dispatch(logoutTC());
    }
    if (isAuth === "") { return <Redirect to={"/login"} />; }

    //при успешной логинизации отрисовываем данные пользователя
    return (

        <div>
            <h1>Profile</h1>
            <br />
            <h3>Данные пользователя</h3>

            <p>email - {data.email}</p>
            <p>name - {data.name}</p>
            <p>created - {data.created}</p>
            <p>updated - {data.updated}</p>
            <p>count of cards - {data.publicCardPacksCount}</p>
            <br />
            <button onClick={logout}>Log Out</button>
        </div>
    );
}