import { NavLink, Redirect } from "react-router-dom";
import { PATH } from "../../Routes";
import s from "./Header.module.css"
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../Redux/store";
import { logoutTC } from "../../Redux/login-reducer";
import React from "react";
import NavItem from "./NavItem/NavItem";
import logoutLogo from './icon-logout.png'

function Header() {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    const isAuthError = useSelector<AppStateType, string | null>(state => state.loginPage.error)
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)

    if (isAuthError) {
        return <Redirect to={"/login"} />;
    }
    return (
        <div className={s.header}>
            <div className={s.container}>
                <h2 className={s.title}>It-incubator</h2>
                <div className={s.fake}></div>
                <div className={s.nav}>
                    <NavItem title="Pack list" />
                    <NavItem title="Profile" />
                    {/*                     
                    <NavLink to={PATH.NEW_PASS}> NewPassword |</NavLink>
                    <NavLink to={PATH.PROFILE}> Profile |</NavLink>
                    <NavLink to={PATH.PACKS_PAGE}> PACKS </NavLink> */}
                    {/*// add NavLinks*/}
                    <div className={s.fake}></div>
                    <div onClick={logout} className={s.logout}><img src={logoutLogo} alt="logoutLogo" className={s.logoutLogo} /></div>
                </div>
            </div>
        </div >
    )
}

export default Header