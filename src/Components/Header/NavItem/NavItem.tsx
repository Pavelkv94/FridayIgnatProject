import React, { Dispatch, SetStateAction, useState } from "react";
import s from './NavItem.module.css'
import packsImg from './Group.png'
import profile from './Union.png'
import { NavLink } from "react-router-dom";
import { PATH } from "../../../Routes";


type ItemPropsType = {
    title: string
    status: boolean
}

function NavItem(props: ItemPropsType) {
    let [profilePage, setProfilePage] = useState(true);

    return (
        <NavLink to={props.title === "Profile" ? PATH.PROFILE : PATH.PACKS_PAGE} className={s.link}>
            <div className={`${s.container} ${profilePage && s.active}`}>
                <img src={props.title === "Profile" ? profile : packsImg} alt="icon" />
                {props.title}
            </div>
        </NavLink>
    )
}

export default NavItem