import { NavLink, Redirect } from "react-router-dom";
import { PATH } from "../../Routes";
import s from "./Header.module.css"
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../Redux/store";
import { logoutTC } from "../../Redux/login-reducer";
import React, { useState } from "react";
import logoutLogo from './icon-logout.png'
import Preloader from "../../Common/Preloader/Preloader";
import packsImg from './NavItem/Group.png'
import profile from './NavItem/Union.png'

const Header = React.memo(() => {

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    let [profilePage, setProfilePage] = useState(false);

    const isAuthError = useSelector<AppStateType, string | null>(state => state.loginPage.error)
    const status = useSelector<AppStateType, string>((state) => state.app.status)

    if (isAuthError) {
        return <Redirect to={"/login"} />;
    }


    return (
        <div className={s.header}>
            <div className={s.container}>
                <h2 className={s.title}>It-incubator</h2>
                <div className={s.fake}></div>
                <div className={s.nav}>
                    <NavLink to={PATH.PACKS_PAGE} className={s.link}>
                        <div className={`${s.navItem} ${profilePage && s.active}`} onClick={() => setProfilePage(true)}>
                            <img src={packsImg} alt="icon" />
                            Pack list
                        </div>
                    </NavLink>
                    <NavLink to={PATH.PROFILE} className={s.link}>
                        <div className={`${s.navItem} ${!profilePage && s.active}`} onClick={() => setProfilePage(false)}>
                            <img src={profile} alt="icon" />
                            Profile
                        </div>
                    </NavLink>

                    <div className={s.fake}></div>
                    <div onClick={logout} className={s.logout}><img src={logoutLogo} alt="logoutLogo" className={s.logoutLogo} /></div>
                </div>
            </div>
            {status !== 'idle' ? <Preloader /> : null}
        </div >
    )
})

export default Header