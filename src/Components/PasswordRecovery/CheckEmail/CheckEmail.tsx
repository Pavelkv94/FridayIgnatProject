import React from 'react';
import s from './CheckEmail.module.css'
import icon from './iconemail.png'
export function CheckEmail() {

    return (
        <div className={s.container}>
            <div className={s.checkContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <div className={s.icon}>  <img src={icon} alt="aa" /></div>

                <p className={s.subTitle}>Check Email</p>
                <div className={s.info}>
                    <p>We’ve sent an Email with instructions to example@mail.com</p>
                </div>
            </div>
        </div>
    );
}