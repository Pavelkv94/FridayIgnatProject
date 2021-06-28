import React from 'react';
import { useSelector } from 'react-redux';
import { ResponseLoginType } from '../../api/fridayProject-api';
import { AppStateType } from '../../Redux/store';

export function Profile() {

    const data = useSelector<AppStateType, ResponseLoginType>(state => state.loginPage.userData)

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

        </div>
    );
}