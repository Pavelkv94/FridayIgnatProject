import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseLoginType } from '../../api/fridayProject-api';
import { logoutTC } from '../../Redux/login-reducer';
import { AppStateType } from '../../Redux/store';
import { Redirect } from 'react-router-dom';

export function Profile() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.loginPage.isLoggedIn)
    const data = useSelector<AppStateType, ResponseLoginType>(state => state.loginPage.userData)

    if (isLoggedIn) {
        return <Redirect to='/login' />
    }

    const logout = () => {
        dispatch(logoutTC())
    }

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
            <button onClick={logout}>X</button>
        </div>
    );
}