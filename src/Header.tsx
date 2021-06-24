import {NavLink} from "react-router-dom";
import {PATH} from "./Routes";

function Header() {
    return (
        <div>
            <NavLink to={PATH.LOGIN}>Login </NavLink>
            <NavLink to={PATH.REGISTRATION}>Registration </NavLink>
            <NavLink to={PATH.NEW_PASS}>NewPassword </NavLink>
            <NavLink to={PATH.PROFILE}>Profile </NavLink>
            <NavLink to={PATH.RECOVERY_PASS}>PasswordRecovery </NavLink>
            <NavLink to={PATH.TEST_PAGE}>Super Component </NavLink>
            {/*// add NavLinks*/}
        </div>
    )
}

export default Header