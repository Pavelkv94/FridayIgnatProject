import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes";
import s from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/store";
import {logoutTC} from "../../Redux/login-reducer";
import React from "react";

function Header() {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

    return (
        <div className={s.header}>
            <NavLink to={PATH.LOGIN}>Login |</NavLink>
            <NavLink to={PATH.NEW_PASS}> NewPassword |</NavLink>
            <NavLink to={PATH.PROFILE}> Profile |</NavLink>
            <NavLink to={PATH.PACKS_PAGE}> PACKS </NavLink>
            {/*// add NavLinks*/}
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Header