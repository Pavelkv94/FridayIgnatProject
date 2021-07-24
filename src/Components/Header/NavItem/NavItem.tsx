import React from "react";
import s from './NavItem.module.css'
import packsImg from './Group.png'
import profile from './Union.png'
import { NavLink } from "react-router-dom";
import { PATH } from "../../../Routes";


type ItemPropsType = {
    title: string
}

function NavItem(props: ItemPropsType) {
    return (
        <NavLink to={props.title === "Profile" ? PATH.PROFILE : PATH.PACKS_PAGE} className={s.link}>
            <div className={s.container}>
                <img src={props.title === "Profile" ? profile : packsImg} alt="icon" />
                {props.title}
            </div>
        </NavLink>
    )
}

export default NavItem